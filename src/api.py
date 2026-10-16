#!/usr/bin/env python3
"""
Higgsfield Web Studio API Server
Bridges the Web Interface with the Reconstructed Client & MCP Server.
"""

import os
import sys
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

# Include current directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from client import HiggsfieldClient, HiggsfieldError
from models_catalog import MODELS
from prompt_engine import PromptEngine
from mcp_server import TOOLS, SERVER_NAME, SERVER_VERSION

app = FastAPI(title="Higgsfield AI Studio API", version="1.0.0")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = HiggsfieldClient()

class PromptRequest(BaseModel):
    subject_action: str
    camera_motion: str = "camera_push"
    environment_reaction: Optional[str] = None
    lighting_atmospheric: Optional[str] = None
    custom_instructions: Optional[str] = None

class GenerateRequest(BaseModel):
    model: str = "seedance_2_5"
    prompt: str
    image_url: Optional[str] = None
    aspect_ratio: str = "16:9"
    resolution: str = "1080p"
    duration: int = 5
    with_polling: bool = True

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Higgsfield Reconstructed Studio"}

@app.get("/api/models")
def get_models(type: Optional[str] = None):
    if not type or type == "all":
        return MODELS
    return {k: v for k, v in MODELS.items() if v.get("type") == type}

@app.post("/api/prompt-engine")
def build_prompt(req: PromptRequest):
    prompt = PromptEngine.generate_prompt(
        subject_action=req.subject_action,
        camera_motion=req.camera_motion,
        environment_reaction=req.environment_reaction,
        lighting_atmospheric=req.lighting_atmospheric,
        custom_instructions=req.custom_instructions
    )
    return {
        "prompt": prompt,
        "model": "seedance_2_5",
        "duration": "5s",
        "ending": "natural and realistic motion"
    }

@app.post("/api/generate")
def create_generation(req: GenerateRequest):
    params: Dict[str, Any] = {
        "prompt": req.prompt,
        "aspect_ratio": req.aspect_ratio,
        "resolution": req.resolution,
        "duration": req.duration
    }
    if req.image_url:
        params["image"] = req.image_url

    try:
        res = client.generate(req.model, params, with_polling=req.with_polling)
        return res
    except HiggsfieldError as err:
        raise HTTPException(status_code=400, detail=str(err))

@app.get("/api/status/{request_id}")
def check_status(request_id: str):
    try:
        return client.get_status(request_id)
    except HiggsfieldError as err:
        raise HTTPException(status_code=400, detail=str(err))

@app.post("/api/upload")
async def upload_media(file: UploadFile = File(...)):
    try:
        content = await file.read()
        url = client.upload_file(content, filename=file.filename)
        return {"url": url, "filename": file.filename, "status": "uploaded"}
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(err)}")

@app.get("/api/mcp/info")
def mcp_info():
    abs_mcp_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "mcp_server.py")).replace("\\", "/")
    return {
        "server_name": SERVER_NAME,
        "version": SERVER_VERSION,
        "path": abs_mcp_path,
        "tools": TOOLS,
        "config_snippets": {
            "antigravity": {
                "mcpServers": {
                    "higgsfield": {
                        "command": "python",
                        "args": [abs_mcp_path],
                        "env": {"HF_CREDENTIALS": "YOUR_KEY_ID:YOUR_KEY_SECRET"}
                    }
                }
            },
            "claude_desktop": {
                "mcpServers": {
                    "higgsfield": {
                        "command": "python",
                        "args": [abs_mcp_path],
                        "env": {"HF_CREDENTIALS": "YOUR_KEY_ID:YOUR_KEY_SECRET"}
                    }
                }
            }
        }
    }

# Serve web build if exists
dist_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "web", "dist")
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="web")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    print(f"Starting Higgsfield API Studio on http://127.0.0.1:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)

