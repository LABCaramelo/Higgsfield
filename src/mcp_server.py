#!/usr/bin/env python3
"""
Higgsfield Model Context Protocol (MCP) Server
Universal JSON-RPC 2.0 stdio server providing Higgsfield generative media tools
for Claude Desktop, Claude Code, Cursor, Antigravity, and other MCP clients.
"""

import sys
import os
import json
import traceback
from typing import Dict, Any, List

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from client import HiggsfieldClient, HiggsfieldError
from models_catalog import MODELS, get_model_spec
from prompt_engine import PromptEngine

SERVER_NAME = "higgsfield-mcp"
SERVER_VERSION = "1.0.0"

# Lazy client instance
_client: HiggsfieldClient = None

def get_client() -> HiggsfieldClient:
    global _client
    if _client is None:
        _client = HiggsfieldClient()
    return _client

TOOLS = [
    {
        "name": "higgsfield_generate_video",
        "description": "Generate cinematic AI videos using Higgsfield models (Seedance 2.5, Seedance 2.0, Kling 3.0, Veo 3.1, Gemini Omni). Supports text-to-video, image-to-video, and camera motions.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "model": {
                    "type": "string",
                    "description": "Video model identifier: 'seedance_2_5' (recommended default), 'seedance_2_0', 'kling3_0', 'veo_3_1', 'gemini_omni'.",
                    "default": "seedance_2_5"
                },
                "prompt": {
                    "type": "string",
                    "description": "Cinematic motion prompt describing camera movement, subject action, and atmosphere."
                },
                "image_url": {
                    "type": "string",
                    "description": "Optional starting image URL or upload ID for image-to-video generation."
                },
                "aspect_ratio": {
                    "type": "string",
                    "description": "Aspect ratio: '16:9' (landscape), '9:16' (vertical/mobile), '1:1' (square), '4:3', '21:9'.",
                    "default": "16:9"
                },
                "duration": {
                    "type": "integer",
                    "description": "Duration in seconds (typically 5 or 10).",
                    "default": 5
                },
                "resolution": {
                    "type": "string",
                    "description": "Output resolution: '720p', '1080p'.",
                    "default": "1080p"
                },
                "with_polling": {
                    "type": "boolean",
                    "description": "Whether to wait and poll until video generation completes.",
                    "default": True
                }
            },
            "required": ["prompt"]
        }
    },
    {
        "name": "higgsfield_generate_image",
        "description": "Generate ultra-realistic images, graphic assets, or product photography using Nano Banana Pro, GPT Image 2.5, FLUX.2, or Soul V2.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "model": {
                    "type": "string",
                    "description": "Image model identifier: 'nano_banana_2' (flagship), 'gpt_image_2_5' (design/text), 'flux_2', 'text2image_soul_v2'.",
                    "default": "nano_banana_2"
                },
                "prompt": {
                    "type": "string",
                    "description": "Detailed image generation prompt."
                },
                "aspect_ratio": {
                    "type": "string",
                    "description": "Aspect ratio: '16:9', '9:16', '1:1', '4:3', '3:4', '21:9'.",
                    "default": "16:9"
                },
                "resolution": {
                    "type": "string",
                    "description": "Resolution: '1k', '2k', '4k'.",
                    "default": "2k"
                },
                "quality": {
                    "type": "string",
                    "description": "Quality preset for GPT Image 2.5 ('low', 'medium', 'high', 'xhigh', 'max').",
                    "default": "high"
                },
                "image_references": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of reference image URLs or IDs for style, character, or composition guidance."
                },
                "with_polling": {
                    "type": "boolean",
                    "description": "Whether to wait and poll until image generation completes.",
                    "default": True
                }
            },
            "required": ["prompt"]
        }
    },
    {
        "name": "higgsfield_build_motion_prompt",
        "description": "Build an optimized 5-second image-to-video motion prompt following clean-room Higgsfield physics and camera choreography.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "subject_action": {
                    "type": "string",
                    "description": "Primary subject action visible in the scene (e.g. 'the watch tourbillon rotates smoothly with ticking second hand')."
                },
                "camera_motion": {
                    "type": "string",
                    "description": "Camera motion type: 'camera_push', 'camera_pull', 'orbit_pan', 'tracking_shot', 'drone_sweep', 'subtle_ambient', 'high_speed'.",
                    "default": "camera_push"
                },
                "environment_reaction": {
                    "type": "string",
                    "description": "Secondary environmental reaction (e.g. 'light caustics ripple across the metal bezel')."
                },
                "lighting_atmospheric": {
                    "type": "string",
                    "description": "Lighting shifts or atmospheric particles (e.g. 'soft warm volumetric rays shifting across background')."
                },
                "custom_instructions": {
                    "type": "string",
                    "description": "Additional specific constraints without contradicting the image."
                }
            },
            "required": ["subject_action"]
        }
    },
    {
        "name": "higgsfield_virality_predictor",
        "description": "Analyze a finished video clip for hook retention, attention curve, and viral potential score using the Brain Activity model.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "video_url": {
                    "type": "string",
                    "description": "Public URL or upload ID of the video clip to analyze."
                },
                "with_polling": {
                    "type": "boolean",
                    "description": "Whether to wait and poll for the report.",
                    "default": True
                }
            },
            "required": ["video_url"]
        }
    },
    {
        "name": "higgsfield_upload_media",
        "description": "Upload a local image, audio, or video file to Higgsfield CDN and obtain a public reference URL.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "Absolute path to the local file on disk."
                }
            },
            "required": ["file_path"]
        }
    },
    {
        "name": "higgsfield_get_status",
        "description": "Check the progress or retrieve results for an active or completed generation request.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "request_id": {
                    "type": "string",
                    "description": "Unique request identifier returned by generate."
                }
            },
            "required": ["request_id"]
        }
    },
    {
        "name": "higgsfield_list_models",
        "description": "List all 40+ supported Higgsfield AI generation models, parameters, and defaults.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "filter_type": {
                    "type": "string",
                    "description": "Filter by type: 'video', 'image', or 'all'.",
                    "default": "all"
                }
            }
        }
    }
]

def handle_tool_call(tool_name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
    client = get_client()

    if tool_name == "higgsfield_build_motion_prompt":
        prompt = PromptEngine.generate_prompt(
            subject_action=arguments.get("subject_action", ""),
            camera_motion=arguments.get("camera_motion", "camera_push"),
            environment_reaction=arguments.get("environment_reaction"),
            lighting_atmospheric=arguments.get("lighting_atmospheric"),
            custom_instructions=arguments.get("custom_instructions")
        )
        return {
            "prompt": prompt,
            "target_model": "seedance_2_5",
            "approx_duration": "5 seconds",
            "rule": "Ending guaranteed: natural and realistic motion"
        }

    elif tool_name == "higgsfield_list_models":
        ftype = arguments.get("filter_type", "all").lower()
        res = {}
        for m_id, spec in MODELS.items():
            if ftype in ("all", spec.get("type")):
                res[m_id] = spec
        return {"models_count": len(res), "models": res}

    elif tool_name == "higgsfield_upload_media":
        fpath = arguments.get("file_path")
        if not fpath or not os.path.exists(fpath):
            raise BadInputError(f"File not found: {fpath}")
        url = client.upload_file(fpath)
        return {"file_path": fpath, "public_url": url, "status": "uploaded"}

    elif tool_name == "higgsfield_get_status":
        req_id = arguments.get("request_id")
        return client.get_status(req_id)

    elif tool_name == "higgsfield_generate_video":
        model = arguments.get("model", "seedance_2_5")
        prompt = arguments.get("prompt")
        img = arguments.get("image_url")
        ar = arguments.get("aspect_ratio", "16:9")
        dur = arguments.get("duration", 5)
        res = arguments.get("resolution", "1080p")
        polling = arguments.get("with_polling", True)

        params: Dict[str, Any] = {
            "prompt": prompt,
            "aspect_ratio": ar,
            "duration": dur,
            "resolution": res,
            "mode": "t2v" if not img else "i2v"
        }
        if img:
            params["image"] = img

        return client.generate(model, params, with_polling=polling)

    elif tool_name == "higgsfield_generate_image":
        model = arguments.get("model", "nano_banana_2")
        prompt = arguments.get("prompt")
        ar = arguments.get("aspect_ratio", "16:9")
        res = arguments.get("resolution", "2k")
        qual = arguments.get("quality", "high")
        refs = arguments.get("image_references")
        polling = arguments.get("with_polling", True)

        params: Dict[str, Any] = {
            "prompt": prompt,
            "aspect_ratio": ar,
            "resolution": res,
            "quality": qual
        }
        if refs:
            params["image_references"] = refs

        return client.generate(model, params, with_polling=polling)

    elif tool_name == "higgsfield_virality_predictor":
        vid = arguments.get("video_url")
        polling = arguments.get("with_polling", True)
        params = {"video": vid}
        return client.generate("brain_activity", params, with_polling=polling)

    else:
        raise BadInputError(f"Unknown tool: {tool_name}")

def main():
    """Main JSON-RPC stdio loop."""
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                break
            line = line.strip()
            if not line:
                continue

            msg = json.loads(line)
            req_id = msg.get("id")
            method = msg.get("method")
            params = msg.get("params", {})

            if method == "initialize":
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "protocolVersion": "2024-11-05",
                        "capabilities": {
                            "tools": {}
                        },
                        "serverInfo": {
                            "name": SERVER_NAME,
                            "version": SERVER_VERSION
                        }
                    }
                }
                sys.stdout.write(json.dumps(resp) + "\n")
                sys.stdout.flush()

            elif method == "notifications/initialized":
                # No response needed for notifications
                pass

            elif method == "ping":
                resp = {"jsonrpc": "2.0", "id": req_id, "result": {}}
                sys.stdout.write(json.dumps(resp) + "\n")
                sys.stdout.flush()

            elif method == "tools/list":
                resp = {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {
                        "tools": TOOLS
                    }
                }
                sys.stdout.write(json.dumps(resp) + "\n")
                sys.stdout.flush()

            elif method == "tools/call":
                tool_name = params.get("name")
                tool_args = params.get("arguments", {})
                try:
                    result_data = handle_tool_call(tool_name, tool_args)
                    resp = {
                        "jsonrpc": "2.0",
                        "id": req_id,
                        "result": {
                            "content": [
                                {
                                    "type": "text",
                                    "text": json.dumps(result_data, indent=2, ensure_ascii=False)
                                }
                            ],
                            "isError": False
                        }
                    }
                except Exception as err:
                    resp = {
                        "jsonrpc": "2.0",
                        "id": req_id,
                        "result": {
                            "content": [
                                {
                                    "type": "text",
                                    "text": f"Error executing {tool_name}: {str(err)}"
                                }
                            ],
                            "isError": True
                        }
                    }
                sys.stdout.write(json.dumps(resp) + "\n")
                sys.stdout.flush()

            else:
                if req_id is not None:
                    resp = {
                        "jsonrpc": "2.0",
                        "id": req_id,
                        "error": {
                            "code": -32601,
                            "message": f"Method not found: {method}"
                        }
                    }
                    sys.stdout.write(json.dumps(resp) + "\n")
                    sys.stdout.flush()

        except Exception as err:
            err_resp = {
                "jsonrpc": "2.0",
                "id": None,
                "error": {
                    "code": -32603,
                    "message": f"Internal error: {str(err)}",
                    "data": traceback.format_exc()
                }
            }
            sys.stdout.write(json.dumps(err_resp) + "\n")
            sys.stdout.flush()

if __name__ == "__main__":
    main()
