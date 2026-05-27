"""
PZEM-004T Modbus RTU reader.

Reads voltage, current, power, energy, frequency, and power factor
from a PZEM-004T-100A module over serial (RS485 / TTL).

Register map (PZEM-004T v3):
  0x0000  Voltage       (V)   × 0.1
  0x0001  Current Low   (A)   × 0.001
  0x0002  Current High  (A)
  0x0003  Power Low     (W)   × 0.1
  0x0004  Power High    (W)
  0x0005  Energy Low    (Wh)  × 1
  0x0006  Energy High   (Wh)
  0x0007  Frequency     (Hz)  × 0.1
  0x0008  Power Factor        × 0.01
  0x0009  Alarm status
"""

from __future__ import annotations

import logging
import random
import time
from dataclasses import dataclass
from datetime import datetime, timezone

logger = logging.getLogger(__name__)


@dataclass
class PzemReading:
    """A single reading from a PZEM-004T sensor."""

    device_id: str
    voltage_v: float
    current_a: float
    power_w: float
    energy_kwh: float
    frequency_hz: float
    power_factor: float
    recorded_at: str  # ISO 8601

    def to_dict(self) -> dict:
        return {
            "device_id": self.device_id,
            "voltage_v": round(self.voltage_v, 2),
            "current_a": round(self.current_a, 3),
            "power_w": round(self.power_w, 2),
            "energy_kwh": round(self.energy_kwh, 3),
            "frequency_hz": round(self.frequency_hz, 1),
            "power_factor": round(self.power_factor, 2),
            "recorded_at": self.recorded_at,
        }


class PzemReader:
    """Reads data from a PZEM-004T-100A via Modbus RTU over serial."""

    def __init__(
        self,
        port: str,
        baudrate: int = 9600,
        address: int = 0x01,
        device_id: str = "pzem-001",
    ):
        self.port = port
        self.baudrate = baudrate
        self.address = address
        self.device_id = device_id
        self._client = None

    def connect(self) -> None:
        """Open the Modbus RTU serial connection."""
        try:
            from pymodbus.client import ModbusSerialClient

            self._client = ModbusSerialClient(
                port=self.port,
                baudrate=self.baudrate,
                parity="N",
                stopbits=1,
                bytesize=8,
                timeout=2,
            )

            if not self._client.connect():
                raise ConnectionError(
                    f"Could not connect to PZEM on {self.port}"
                )

            logger.info(
                f"✅ Connected to PZEM-004T on {self.port} "
                f"(address=0x{self.address:02X})"
            )

        except ImportError:
            raise ImportError(
                "pymodbus is required. Install with: pip install pymodbus"
            )

    def disconnect(self) -> None:
        """Close the serial connection."""
        if self._client:
            self._client.close()
            logger.info("🔌 Disconnected from PZEM-004T")

    def read(self) -> PzemReading | None:
        """
        Read all registers from the PZEM-004T.
        Returns a PzemReading or None on error.
        """
        if not self._client:
            logger.error("Not connected — call connect() first")
            return None

        try:
            # Read 10 input registers starting at 0x0000
            result = self._client.read_input_registers(
                address=0x0000,
                count=10,
                slave=self.address,
            )

            if result.isError():
                logger.warning(f"Modbus read error: {result}")
                return None

            regs = result.registers

            # Parse register values per PZEM-004T v3 datasheet
            voltage_v = regs[0] / 10.0
            current_a = (regs[2] * 65536 + regs[1]) / 1000.0
            power_w = (regs[4] * 65536 + regs[3]) / 10.0
            energy_wh = regs[6] * 65536 + regs[5]
            energy_kwh = energy_wh / 1000.0
            frequency_hz = regs[7] / 10.0
            power_factor = regs[8] / 100.0

            reading = PzemReading(
                device_id=self.device_id,
                voltage_v=voltage_v,
                current_a=current_a,
                power_w=power_w,
                energy_kwh=energy_kwh,
                frequency_hz=frequency_hz,
                power_factor=power_factor,
                recorded_at=datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z",
            )

            logger.debug(
                f"📊 {reading.voltage_v}V | {reading.current_a}A | "
                f"{reading.power_w}W | {reading.energy_kwh}kWh | "
                f"{reading.frequency_hz}Hz | PF={reading.power_factor}"
            )

            return reading

        except Exception as e:
            logger.error(f"Error reading PZEM-004T: {e}")
            return None


class SimulatedPzemReader:
    """
    Generates fake PZEM readings for testing without hardware.
    Simulates realistic Colombian residential power patterns.
    """

    def __init__(self, device_id: str = "pzem-001"):
        self.device_id = device_id
        self._energy_kwh = 0.0
        self._last_read = time.time()

    def connect(self) -> None:
        logger.info("🧪 Simulated PZEM-004T connected (no real hardware)")

    def disconnect(self) -> None:
        logger.info("🧪 Simulated PZEM-004T disconnected")

    def read(self) -> PzemReading:
        """Generate a realistic simulated reading."""
        now = time.time()
        elapsed_hours = (now - self._last_read) / 3600.0
        self._last_read = now

        # Simulate Colombian residential voltage (~120V ± 5V)
        voltage = 118.0 + random.uniform(-3.0, 5.0)

        # Simulate varying load (0.1A to 8A)
        hour = datetime.now().hour
        if 6 <= hour < 9 or 18 <= hour < 22:
            # Peak hours: higher consumption
            current = random.uniform(2.0, 8.0)
        elif 9 <= hour < 18:
            # Daytime: moderate
            current = random.uniform(0.5, 3.0)
        else:
            # Night: low (standby)
            current = random.uniform(0.1, 1.0)

        power = voltage * current * random.uniform(0.85, 0.99)
        power_factor = random.uniform(0.80, 0.99)
        frequency = 60.0 + random.uniform(-0.2, 0.2)

        # Accumulate energy
        self._energy_kwh += (power / 1000.0) * elapsed_hours

        reading = PzemReading(
            device_id=self.device_id,
            voltage_v=voltage,
            current_a=current,
            power_w=power,
            energy_kwh=self._energy_kwh,
            frequency_hz=frequency,
            power_factor=power_factor,
            recorded_at=datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z",
        )

        logger.info(
            f"🧪 SIM: {reading.voltage_v:.1f}V | {reading.current_a:.2f}A | "
            f"{reading.power_w:.1f}W | {reading.energy_kwh:.3f}kWh | "
            f"{reading.frequency_hz:.1f}Hz | PF={reading.power_factor:.2f}"
        )

        return reading
