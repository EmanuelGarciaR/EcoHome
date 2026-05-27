"""
Main collector loop that coordinates reading from the sensor and sending to the API.
"""

import logging
import time
from typing import List

from .config import Config
from .pzem_reader import PzemReading

logger = logging.getLogger(__name__)


class CollectorManager:
    """Manages the read-and-send loop with batching and retries."""

    def __init__(self, config: Config, reader, api_client):
        self.config = config
        self.reader = reader
        self.api_client = api_client
        self.buffer: List[PzemReading] = []
        self._running = False

    def start(self) -> None:
        """Start the collection loop. Blocks until stopped."""
        self.reader.connect()
        self._running = True

        logger.info("🚀 Starting EcoHome Collector...")
        logger.info(f"   Polling every: {self.config.poll_interval_seconds}s")
        logger.info(f"   Batch size:    {self.config.batch_size}")

        try:
            while self._running:
                self._tick()
                # Sleep in small increments to allow responsive shutdown
                self._sleep_interruptible(self.config.poll_interval_seconds)

        except KeyboardInterrupt:
            logger.info("🛑 Received KeyboardInterrupt, shutting down...")
        finally:
            self.stop()

    def stop(self) -> None:
        """Stop the collector and flush remaining buffer."""
        self._running = False
        self.reader.disconnect()

        if self.buffer:
            logger.info(f"Flushing {len(self.buffer)} remaining readings...")
            self.api_client.send_readings(self.buffer)
            self.buffer.clear()

        logger.info("👋 Collector stopped")

    def _tick(self) -> None:
        """Perform one read cycle and send if batch is full."""
        reading = self.reader.read()

        if reading:
            self.buffer.append(reading)

        # Send if we've reached batch size
        if len(self.buffer) >= self.config.batch_size:
            success = self._send_with_retries(self.buffer)
            if success:
                self.buffer.clear()
            else:
                # If sending failed even after retries, we keep the data in
                # the buffer. But to prevent memory leaks if offline forever,
                # we cap the buffer size (e.g., max 1000 readings).
                if len(self.buffer) > 1000:
                    logger.warning("Buffer full, dropping oldest readings")
                    self.buffer = self.buffer[-500:]

    def _send_with_retries(self, readings: List[PzemReading]) -> bool:
        """Send readings with exponential backoff on failure."""
        retries = 0
        backoff = 2.0

        while retries <= self.config.max_retries:
            if self.api_client.send_readings(readings):
                return True

            retries += 1
            if retries <= self.config.max_retries:
                logger.warning(
                    f"Send failed. Retrying ({retries}/{self.config.max_retries}) "
                    f"in {backoff}s..."
                )
                time.sleep(backoff)
                backoff *= 2

        logger.error("❌ Max retries reached. Keeping readings in buffer.")
        return False

    def _sleep_interruptible(self, seconds: float) -> None:
        """Sleep for N seconds but wake up quickly if _running becomes False."""
        end_time = time.time() + seconds
        while self._running and time.time() < end_time:
            time.sleep(0.1)
