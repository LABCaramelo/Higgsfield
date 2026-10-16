"""
Higgsfield Motion Prompt Engine (Clean-Room Recreation)
Produces structured, physically believable 5-second image-to-video motion prompts
compatible with Seedance 2.5, Kling 3.0, and Veo 3.1.
"""

from typing import Optional, Dict, Any, List

MOTION_MODELS = {
    "camera_push": "slow cinematic camera push-in towards the subject, subtle parallax on background elements",
    "camera_pull": "gentle camera pull-back revealing surrounding environment, smooth steady motion",
    "orbit_pan": "slow 45-degree lateral orbit around subject, shallow depth of field, steady tracking",
    "tracking_shot": "smooth horizontal tracking shot following primary subject movement",
    "drone_sweep": "elevated crane or drone sweep rising slowly while tilting down slightly",
    "subtle_ambient": "stationary camera with micro handheld breathing, natural wind and environmental secondary motion",
    "high_speed": "dynamic camera acceleration with rapid subject action and cinematic motion blur",
}

SUFFIX = "natural and realistic motion"

class PromptEngine:
    """
    Engine to format and generate 5-second image-to-video prompts
    following the clean-room Higgsfield methodology.
    """

    @staticmethod
    def generate_prompt(
        subject_action: str,
        camera_motion: str = "camera_push",
        environment_reaction: Optional[str] = None,
        lighting_atmospheric: Optional[str] = None,
        custom_instructions: Optional[str] = None
    ) -> str:
        """
        Builds a single-line English motion prompt strictly under 2500 characters,
        designed for a 5-second shot.
        """
        parts = []

        # 1. Subject Action
        clean_action = subject_action.strip().rstrip(".")
        parts.append(clean_action)

        # 2. Camera Move
        cam_desc = MOTION_MODELS.get(camera_motion, camera_motion).strip().rstrip(".")
        parts.append(cam_desc)

        # 3. Environmental Reaction
        if environment_reaction:
            parts.append(environment_reaction.strip().rstrip("."))

        # 4. Lighting & Atmospherics
        if lighting_atmospheric:
            parts.append(lighting_atmospheric.strip().rstrip("."))

        # 5. User Specifics
        if custom_instructions:
            parts.append(custom_instructions.strip().rstrip("."))

        # Combine into one coherent line
        prompt_body = ", ".join(parts)
        
        # Ensure canonical suffix
        if not prompt_body.lower().endswith(SUFFIX):
            prompt = f"{prompt_body}, {SUFFIX}"
        else:
            prompt = prompt_body

        return prompt
