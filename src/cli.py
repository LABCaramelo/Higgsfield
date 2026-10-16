#!/usr/bin/env python3
"""
Higgsfield Reconstructed CLI Tool (`hf` / `higgsfield`)
Command-line interface matching official workflows.
"""

import sys
import os
import argparse
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from client import HiggsfieldClient
from models_catalog import MODELS
from prompt_engine import PromptEngine

def main():
    parser = argparse.ArgumentParser(
        prog="higgsfield",
        description="Higgsfield AI Reconstructed CLI — Generate video, images and prompts from terminal."
    )
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command: model
    model_parser = subparsers.add_parser("model", help="Browse and inspect models")
    model_sub = model_parser.add_subparsers(dest="model_action")
    model_list = model_sub.add_parser("list", help="List available models")
    model_list.add_argument("--video", action="store_true", help="Filter video models only")
    model_list.add_argument("--image", action="store_true", help="Filter image models only")

    # Command: generate
    gen_parser = subparsers.add_parser("generate", help="Create and manage generation jobs")
    gen_sub = gen_parser.add_subparsers(dest="gen_action")
    gen_create = gen_sub.add_parser("create", help="Create a generation job")
    gen_create.add_argument("model", help="Model name (e.g. seedance_2_5, nano_banana_2, kling3_0)")
    gen_create.add_argument("--prompt", required=True, help="Generation prompt")
    gen_create.add_argument("--image", help="Input image URL or local path")
    gen_create.add_argument("--aspect-ratio", "--aspect_ratio", default="16:9", help="Aspect ratio")
    gen_create.add_argument("--resolution", default="1080p", help="Resolution")
    gen_create.add_argument("--duration", type=int, default=5, help="Duration in seconds")
    gen_create.add_argument("--wait", action="store_true", default=True, help="Wait for job completion")

    # Command: prompt-engine
    prompt_parser = subparsers.add_parser("prompt-engine", help="Build clean-room 5s motion prompts")
    prompt_parser.add_argument("--subject", required=True, help="Subject action")
    prompt_parser.add_argument("--camera", default="camera_push", help="Camera motion model")
    prompt_parser.add_argument("--environment", help="Environmental reaction")
    prompt_parser.add_argument("--lighting", help="Lighting / atmospherics")

    # Command: upload
    upload_parser = subparsers.add_parser("upload", help="Upload a media file")
    upload_parser.add_argument("file_path", help="Path to file")

    # Command: status
    status_parser = subparsers.add_parser("status", help="Get job status")
    status_parser.add_argument("request_id", help="Request ID")

    # Command: mcp
    mcp_parser = subparsers.add_parser("mcp", help="Start Higgsfield stdio MCP Server")

    args = parser.parse_args()

    if args.command == "mcp":
        from mcp_server import main as mcp_main
        mcp_main()
        return

    client = HiggsfieldClient()

    if args.command == "model":
        filtered = {}
        for m_id, spec in MODELS.items():
            if args.video and spec.get("type") != "video":
                continue
            if args.image and spec.get("type") != "image":
                continue
            filtered[m_id] = spec

        if args.json:
            print(json.dumps(filtered, indent=2))
        else:
            print(f"{'MODEL ID':<22} | {'TYPE':<8} | {'NAME':<20} | DESCRIPTION")
            print("-" * 80)
            for m_id, spec in filtered.items():
                print(f"{m_id:<22} | {spec['type']:<8} | {spec['name']:<20} | {spec['description']}")

    elif args.command == "prompt-engine":
        p = PromptEngine.generate_prompt(
            subject_action=args.subject,
            camera_motion=args.camera,
            environment_reaction=args.environment,
            lighting_atmospheric=args.lighting
        )
        if args.json:
            print(json.dumps({"prompt": p}, indent=2))
        else:
            print(f"\nGenerated 5s Motion Prompt:\n{p}\n")

    elif args.command == "upload":
        url = client.upload_file(args.file_path)
        if args.json:
            print(json.dumps({"file_path": args.file_path, "public_url": url}, indent=2))
        else:
            print(f"Uploaded: {url}")

    elif args.command == "status":
        res = client.get_status(args.request_id)
        print(json.dumps(res, indent=2))

    elif args.command == "generate":
        params = {
            "prompt": args.prompt,
            "aspect_ratio": args.aspect_ratio,
            "resolution": args.resolution,
            "duration": args.duration
        }
        if args.image:
            if os.path.exists(args.image):
                print(f"Uploading local image {args.image}...")
                params["image"] = client.upload_file(args.image)
            else:
                params["image"] = args.image

        print(f"Submitting job to {args.model} (wait={args.wait})...")
        res = client.generate(args.model, params, with_polling=args.wait)
        print(json.dumps(res, indent=2))

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
