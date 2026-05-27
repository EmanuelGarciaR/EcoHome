"""
HTTP client for sending PZEM-004T readings to the EcoHome backend.
"""

import logging
import requests
from requests.exceptions import RequestException

from .config import Config

logger = logging.getLogger(__name__)


class ApiClient:
    """Client for pushing readings to the backend API."""

    def __init__(self, config: Config):
        self.config = config
        self.endpoint = f"{config.api_base_url}/api/v1/ingest/readings"
        self.headers = {
            "Content-Type": "application/json",
            "X-Device-Api-Key": config.api_key,
        }
        # Add connection pooling
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def send_readings(self, readings: list) -> bool:
        """
        Send a batch of readings to the backend.
        Returns True if successful, False otherwise.
        """
        if not readings:
            return True

        payload = {
            "user_id": self.config.user_id,
            "readings": [r.to_dict() for r in readings],
        }

        try:
            logger.debug(f"Sending {len(readings)} readings to {self.endpoint}")
            logger.debug(f"Payload: {payload}")
            response = self.session.post(
                self.endpoint, json=payload, timeout=5.0
            )

            # Check if backend rejected the API key
            if response.status_code in (401, 403):
                logger.error(
                    f"❌ API Key rejected by backend (HTTP {response.status_code}). "
                    "Check DEVICE_API_KEY."
                )
                return False

            # Log response body on errors before raising
            if response.status_code >= 400:
                logger.error(
                    f"❌ HTTP {response.status_code} response body: "
                    f"{response.text}"
                )

            response.raise_for_status()

            data = response.json()
            if data.get("success"):
                logger.info(f"✅ Successfully sent {len(readings)} readings")
                return True
            else:
                logger.error(f"⚠️ Backend returned error: {data}")
                return False

        except RequestException as e:
            logger.error(f"❌ Network error sending data: {e}")
            return False
