"""
Higgsfield Models Catalog & Specs
Reconstructed from Higgsfield CLI & API schemas
"""

from typing import Dict, Any, List

MODELS: Dict[str, Dict[str, Any]] = {
    # --- VIDEO MODELS ---
    "seedance_2_5": {
        "name": "Seedance 2.5",
        "type": "video",
        "description": "SOTA default for cinematic video generation. High-fidelity motion, camera controls and realism.",
        "defaults": {
            "aspect_ratio": "16:9",
            "duration": 5,
            "resolution": "1080p",
            "mode": "t2v",
            "bitrate_mode": "high"
        },
        "allowed_aspect_ratios": ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"],
        "allowed_resolutions": ["720p", "1080p"],
        "allowed_durations": [5, 10]
    },
    "genjutsu": {
        "name": "Higgsfield Genjutsu",
        "type": "video",
        "description": "Motion Transfer, Character Swap & Recast engine. Transfers action, choreography, physics, and camera motion from video references onto images or characters.",
        "defaults": {
            "mode": "motion_transfer",
            "aspect_ratio": "9:16",
            "duration": 5,
            "character_orientation": "match_video",
            "motion_fidelity": "high"
        },
        "allowed_modes": ["motion_transfer", "character_swap", "restyle", "object_swap"],
        "allowed_aspect_ratios": ["9:16", "16:9", "1:1", "4:5"],
        "allowed_durations": [3, 5, 8, 15, 30]
    },
    "seedance_2_0": {
        "name": "Seedance 2.0",
        "type": "video",
        "description": "Standard Seedance model for high-speed motion and 3D scroll website visuals.",
        "defaults": {
            "aspect_ratio": "16:9",
            "duration": 5,
            "resolution": "720p"
        },
        "allowed_aspect_ratios": ["16:9", "9:16", "1:1"],
        "allowed_durations": [5]
    },
    "kling3_0": {
        "name": "Kling v3.0",
        "type": "video",
        "description": "High dynamic range video generation with strong physical motion simulation and camera push/pull.",
        "defaults": {
            "duration": 5,
            "mode": "pro",
            "sound": "off"
        },
        "allowed_durations": [5, 10]
    },
    "veo_3_1": {
        "name": "Veo 3.1",
        "type": "video",
        "description": "Google Veo 3.1 video engine with cinematic camera moves and high temporal consistency.",
        "defaults": {
            "aspect_ratio": "16:9",
            "resolution": "1080p",
            "duration": 5
        }
    },
    "gemini_omni": {
        "name": "Gemini Omni Flash",
        "type": "video",
        "description": "Fast video blocks generation designed for explainer videos and storyboard sequences.",
        "defaults": {
            "duration": 10,
            "resolution": "720p",
            "aspect_ratio": "16:9"
        }
    },
    "brain_activity": {
        "name": "Virality Predictor",
        "type": "analysis",
        "description": "Analyzes finished video for hook strength, attention, retention, and viral potential score.",
        "defaults": {}
    },

    # --- IMAGE MODELS ---
    "nano_banana_2": {
        "name": "Nano Banana Pro",
        "type": "image",
        "description": "Higgsfield flagship image model for ultra-sharp textures, lighting and modern aesthetics.",
        "defaults": {
            "aspect_ratio": "16:9",
            "resolution": "2k"
        },
        "allowed_aspect_ratios": ["1:1", "16:9", "9:16", "4:3", "3:4", "21:9"],
        "allowed_resolutions": ["1k", "2k", "4k"]
    },
    "gpt_image_2_5": {
        "name": "GPT Image 2.5",
        "type": "image",
        "description": "Recommended default for product photography, graphic design, and accurate on-image typography.",
        "defaults": {
            "aspect_ratio": "1:1",
            "quality": "high",
            "resolution": "2k",
            "variant": "flare"
        },
        "allowed_aspect_ratios": ["1:1", "3:2", "2:3", "4:3", "3:4", "16:9", "9:16", "21:9"],
        "allowed_qualities": ["low", "medium", "high", "xhigh", "max"],
        "allowed_resolutions": ["1k", "2k", "4k"]
    },
    "flux_2": {
        "name": "FLUX.2",
        "type": "image",
        "description": "Next-gen photorealistic generation with complex prompt comprehension.",
        "defaults": {
            "aspect_ratio": "1:1",
            "resolution": "2k",
            "variant": "pro"
        }
    },
    "text2image_soul_v2": {
        "name": "Higgsfield Soul V2",
        "type": "image",
        "description": "Character and identity-preserving generation using trained Soul IDs.",
        "defaults": {
            "aspect_ratio": "1:1",
            "quality": "1080p"
        }
    },
    "cinematic_studio_2_5": {
        "name": "Cinematic Studio 2.5",
        "type": "image",
        "description": "Film-grade lighting, lens characteristics, and depth-of-field staging.",
        "defaults": {
            "aspect_ratio": "16:9",
            "resolution": "2k"
        }
    }
}

def get_model_spec(model_name: str) -> Dict[str, Any]:
    return MODELS.get(model_name, {
        "name": model_name,
        "type": "unknown",
        "description": f"Custom or unindexed model {model_name}",
        "defaults": {}
    })
