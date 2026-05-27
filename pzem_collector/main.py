"""
Entry point for the EcoHome PZEM-004T Collector.
"""

import argparse
import logging
import sys
import signal

from .config import Config
from .pzem_reader import PzemReader, SimulatedPzemReader
from .api_client import ApiClient
from .collector import CollectorManager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("pzem_collector.main")


def main():
    parser = argparse.ArgumentParser(
        description="EcoHome PZEM-004T Data Collector"
    )
    parser.add_argument(
        "--simulate",
        action="store_true",
        help="Run without hardware, generating fake realistic data",
    )
    args = parser.parse_args()

    # 1. Load config
    try:
        config = Config()
        config.validate()
    except Exception as e:
        logger.error(f"Config error: {e}")
        sys.exit(1)

    logger.info(f"Loaded config: {config}")

    # 2. Setup components
    if args.simulate:
        reader = SimulatedPzemReader(device_id=config.device_id)
    else:
        reader = PzemReader(
            port=config.serial_port,
            baudrate=config.serial_baudrate,
            address=config.modbus_address,
            device_id=config.device_id,
        )

    api_client = ApiClient(config)
    manager = CollectorManager(config, reader, api_client)

    # 3. Handle termination signals gracefully (systemd)
    def handle_sigterm(signum, frame):
        logger.info(f"Received signal {signum}, stopping gracefully...")
        manager.stop()

    signal.signal(signal.SIGTERM, handle_sigterm)

    # 4. Run
    manager.start()


if __name__ == "__main__":
    main()
