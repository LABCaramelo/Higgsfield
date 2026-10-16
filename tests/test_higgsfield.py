"""
Unit tests for reconstructed Higgsfield suite
"""

import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))

from prompt_engine import PromptEngine
from models_catalog import MODELS, get_model_spec
from client import HiggsfieldClient

class TestHiggsfield(unittest.TestCase):

    def test_prompt_engine_suffix(self):
        prompt = PromptEngine.generate_prompt(
            subject_action="a dancer moves gracefully across the stage",
            camera_motion="camera_push"
        )
        self.assertTrue(prompt.endswith("natural and realistic motion"))
        self.assertIn("slow cinematic camera push-in", prompt)

    def test_models_catalog(self):
        self.assertIn("seedance_2_5", MODELS)
        self.assertIn("nano_banana_2", MODELS)
        self.assertIn("kling3_0", MODELS)
        spec = get_model_spec("seedance_2_5")
        self.assertEqual(spec["type"], "video")

    def test_client_credential_resolution(self):
        client = HiggsfieldClient(credentials="test_key:test_secret")
        self.assertEqual(client.api_key, "test_key")
        self.assertEqual(client.api_secret, "test_secret")
        headers = client._get_headers()
        self.assertEqual(headers["Authorization"], "Key test_key:test_secret")
        self.assertEqual(headers["User-Agent"], "higgsfield-server-js/2.0")

if __name__ == "__main__":
    unittest.main()
