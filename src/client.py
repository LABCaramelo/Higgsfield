"""
Higgsfield AI Client - Clean-room Reconstructed Implementation
Reverse-engineered using MCP REA (Evidence: ev_584aa8aef5cbd481976a11e8e7237f25d1a3bbe8efd2d312d6e1d577387ebb79)
"""

import os
import time
import json
import mimetypes
from typing import Optional, Dict, Any, List, Union
import urllib.request
import urllib.error
import urllib.parse


class HiggsfieldError(Exception):
    """Base exception for Higgsfield client errors."""
    pass


class AuthenticationError(HiggsfieldError):
    """Raised when credentials are invalid or missing."""
    pass


class NotEnoughCreditsError(HiggsfieldError):
    """Raised when account balance is insufficient (HTTP 403 / 402)."""
    pass


class ValidationError(HiggsfieldError):
    """Raised when parameter validation fails (HTTP 422)."""
    pass


class BadInputError(HiggsfieldError):
    """Raised when input format is rejected (HTTP 400)."""
    pass


class TimeoutError(HiggsfieldError):
    """Raised when job polling exceeds max allowed time."""
    pass


class HiggsfieldClient:
    """
    Higgsfield AI API Client.
    Supports V1, V2 generation endpoints, polling, agent sessions, and asset uploads.
    """

    DEFAULT_BASE_URL = "https://api.higgsfield.ai"
    DEFAULT_USER_AGENT = "higgsfield-server-js/2.0"

    def __init__(
        self,
        api_key: Optional[str] = None,
        api_secret: Optional[str] = None,
        credentials: Optional[str] = None,
        base_url: Optional[str] = None,
        timeout: int = 120,
        max_retries: int = 3,
        poll_interval: float = 2.0,
        max_poll_time: int = 300,
    ):
        self.base_url = (base_url or os.getenv("HF_BASE_URL") or self.DEFAULT_BASE_URL).rstrip("/")
        self.timeout = timeout
        self.max_retries = max_retries
        self.poll_interval = poll_interval
        self.max_poll_time = max_poll_time

        # Resolve credentials
        self.api_key, self.api_secret = self._resolve_credentials(api_key, api_secret, credentials)

    def _resolve_credentials(
        self,
        api_key: Optional[str],
        api_secret: Optional[str],
        credentials: Optional[str]
    ) -> tuple[str, str]:
        if credentials:
            parts = credentials.split(":", 1)
            if len(parts) == 2:
                return parts[0], parts[1]
            raise BadInputError("Credentials must be in format 'KEY_ID:KEY_SECRET'")

        if api_key and api_secret:
            return api_key, api_secret

        env_creds = os.getenv("HF_CREDENTIALS") or os.getenv("HF_KEY")
        if env_creds:
            parts = env_creds.split(":", 1)
            if len(parts) == 2:
                return parts[0], parts[1]

        env_key = os.getenv("HF_API_KEY")
        env_secret = os.getenv("HF_API_SECRET")
        if env_key and env_secret:
            return env_key, env_secret

        # Allow unauthenticated initialization for listing models/documentation
        return "", ""

    def _get_headers(self, custom_headers: Optional[Dict[str, str]] = None) -> Dict[str, str]:
        headers = {
            "Content-Type": "application/json",
            "User-Agent": self.DEFAULT_USER_AGENT,
        }
        if self.api_key and self.api_secret:
            headers["Authorization"] = f"Key {self.api_key}:{self.api_secret}"
            headers["hf-api-key"] = self.api_key
            headers["hf-secret"] = self.api_secret

        if custom_headers:
            headers.update(custom_headers)
        return headers

    def _request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Union[Dict[str, Any], bytes]] = None,
        headers: Optional[Dict[str, str]] = None,
        retries: int = 0
    ) -> Dict[str, Any]:
        url = endpoint if endpoint.startswith("http") else f"{self.base_url}{endpoint}"
        req_headers = self._get_headers(headers)

        payload = None
        if data is not None:
            if isinstance(data, (dict, list)):
                payload = json.dumps(data).encode("utf-8")
            else:
                payload = data

        req = urllib.request.Request(url, data=payload, headers=req_headers, method=method.upper())

        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                resp_bytes = resp.read()
                if not resp_bytes:
                    return {}
                try:
                    return json.loads(resp_bytes.decode("utf-8"))
                except Exception:
                    return {"raw_bytes": resp_bytes}
        except urllib.error.HTTPError as err:
            err_body = ""
            try:
                err_body = err.read().decode("utf-8")
                err_json = json.loads(err_body)
                detail = err_json.get("detail", err_body)
            except Exception:
                detail = err_body or err.reason

            if err.code == 401:
                raise AuthenticationError(f"Higgsfield Authentication failed: {detail}")
            elif err.code in (402, 403):
                raise NotEnoughCreditsError(f"Higgsfield Credits / Access Error: {detail}")
            elif err.code == 422:
                raise ValidationError(f"Higgsfield Validation Error: {detail}")
            elif err.code == 400:
                raise BadInputError(f"Higgsfield Bad Input: {detail}")
            elif err.code >= 500 and retries < self.max_retries:
                time.sleep(1.0 * (2 ** retries))
                return self._request(method, endpoint, data, headers, retries + 1)
            else:
                raise HiggsfieldError(f"HTTP {err.code}: {detail}")
        except urllib.error.URLError as err:
            if retries < self.max_retries:
                time.sleep(1.0 * (2 ** retries))
                return self._request(method, endpoint, data, headers, retries + 1)
            raise HiggsfieldError(f"Network error: {err.reason}")

    def generate(
        self,
        model: str,
        params: Dict[str, Any],
        with_polling: bool = True,
        webhook_url: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Submit a generation task for any Higgsfield model (e.g. seedance_2_5, kling3_0, nano_banana_2).
        """
        # Ensure model endpoint formatting
        endpoint = f"/subscribe/{model}" if not model.startswith("/") else model
        if webhook_url:
            separator = "&" if "?" in endpoint else "?"
            endpoint = f"{endpoint}{separator}hf_webhook={urllib.parse.quote(webhook_url)}"

        response = self._request("POST", endpoint, data=params)
        request_id = response.get("request_id") or response.get("id")

        if with_polling and request_id:
            return self.poll_v2(request_id)
        return response

    def poll_v2(self, request_id: str) -> Dict[str, Any]:
        """
        Poll /requests/{request_id}/status until completion, failure, or timeout.
        """
        start_time = time.time()
        polling_url = f"/requests/{request_id}/status"

        while True:
            if (time.time() - start_time) > self.max_poll_time:
                raise TimeoutError(f"Polling exceeded maximum time of {self.max_poll_time}s for request {request_id}")

            try:
                res = self._request("GET", polling_url)
                status = res.get("status", "in_progress")
                if status in ("completed", "failed", "nsfw", "canceled"):
                    return res
            except HiggsfieldError:
                pass

            time.sleep(self.poll_interval)

    def get_status(self, request_id: str) -> Dict[str, Any]:
        """Get instant status of a request without blocking."""
        return self._request("GET", f"/requests/{request_id}/status")

    def upload_file(self, file_path_or_bytes: Union[str, bytes], filename: str = "upload.jpg") -> str:
        """
        Upload media (image, audio, video) to Higgsfield and return the public URL.
        """
        if isinstance(file_path_or_bytes, str):
            with open(file_path_or_bytes, "rb") as f:
                data = f.read()
            filename = os.path.basename(file_path_or_bytes)
        else:
            data = file_path_or_bytes

        content_type, _ = mimetypes.guess_type(filename)
        content_type = content_type or "image/jpeg"
        ext = os.path.splitext(filename)[1].lstrip(".") or "jpg"

        # Request presigned upload slot
        slot = self._request("POST", "/files/generate-upload-url", {"content_type": content_type})
        upload_url = slot.get("upload_url")
        public_url = slot.get("public_url")

        if not upload_url:
            # Fallback to agent media slot
            slot = self._request("POST", "/v1/agent/media", {"extension": ext, "type": "image"})
            upload_url = slot.get("upload_url")
            public_url = slot.get("url")

        # PUT raw bytes to presigned URL
        req = urllib.request.Request(
            upload_url,
            data=data,
            headers={"Content-Type": content_type},
            method="PUT"
        )
        with urllib.request.urlopen(req, timeout=self.timeout) as resp:
            resp.read()

        # Confirm if agent media slot was used
        if "id" in slot:
            try:
                self._request("POST", f"/v1/agent/media/{slot['id']}/confirm", {"type": "image"})
            except Exception:
                pass

        return public_url
