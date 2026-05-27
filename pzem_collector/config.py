"""
Configuration for the EcoHome PZEM-004T data collector.
Loads settings from environment variables or .env file.
"""

import os
from dataclasses import dataclass, field
from dotenv import load_dotenv

# Load .env from the pzem_collector directory first, then project root
_collector_dir = os.path.dirname(os.path.abspath(__file__))
_project_root = os.path.dirname(_collector_dir)

load_dotenv(os.path.join(_collector_dir, ".env"))
load_dotenv(os.path.join(_project_root, ".env"))


@dataclass
class Config:
    """Collector configuration — all values come from env vars."""

    # ── Serial / Modbus settings ────────────────────────────────────
    serial_port: str = field(
        default_factory=lambda: os.getenv("PZEM_SERIAL_PORT", "/dev/ttyUSB0")
    )
    serial_baudrate: int = field(
        default_factory=lambda: int(os.getenv("PZEM_BAUDRATE", "9600"))
    )
    modbus_address: int = field(
        default_factory=lambda: int(os.getenv("PZEM_MODBUS_ADDRESS", "1"))
    )

    # ── Device identity ─────────────────────────────────────────────
    device_id: str = field(
        default_factory=lambda: os.getenv("PZEM_DEVICE_ID", "pzem-001")
    )
    user_id: str = field(
        default_factory=lambda: os.getenv("ECOHOME_USER_ID", "")
    )

    # ── Backend API ─────────────────────────────────────────────────
    api_base_url: str = field(
        default_factory=lambda: os.getenv(
            "ECOHOME_API_URL", "http://localhost:5000"
        )
    )
    api_key: str = field(
        default_factory=lambda: os.getenv("DEVICE_API_KEY", "")
    )

    # ── Collector behavior ──────────────────────────────────────────
    poll_interval_seconds: int = field(
        default_factory=lambda: int(os.getenv("PZEM_POLL_INTERVAL", "5"))
    )
    batch_size: int = field(
        default_factory=lambda: int(os.getenv("PZEM_BATCH_SIZE", "1"))
    )
    max_retries: int = field(
        default_factory=lambda: int(os.getenv("PZEM_MAX_RETRIES", "3"))
    )

    def validate(self) -> None:
        """Validate required configuration values."""
        errors = []

        if not self.api_key:
            errors.append("DEVICE_API_KEY is required")
        if not self.user_id:
            errors.append("ECOHOME_USER_ID is required")

        if errors:
            raise ValueError(
                "Configuration errors:\n" + "\n".join(f"  - {e}" for e in errors)
            )

    def __repr__(self) -> str:
        return (
            f"Config(\n"
            f"  serial_port={self.serial_port!r},\n"
            f"  baudrate={self.serial_baudrate},\n"
            f"  modbus_address=0x{self.modbus_address:02X},\n"
            f"  device_id={self.device_id!r},\n"
            f"  api_url={self.api_base_url!r},\n"
            f"  poll_interval={self.poll_interval_seconds}s,\n"
            f"  batch_size={self.batch_size}\n"
            f")"
        )
