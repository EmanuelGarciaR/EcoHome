import { Router } from "express";
import type { Response, Request } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { device, reading } from "../db/schema.js";
import { successResponse } from "../lib/types.js";
import { validate } from "../middleware/validate.middleware.js";
import { requireDeviceApiKey } from "../middleware/device-auth.middleware.js";

const router = Router();

// All ingestion routes require device API key
router.use(requireDeviceApiKey);

// ── Validation schema ──────────────────────────────────────────────
const readingItemSchema = z.object({
  device_id: z.string().min(1, "device_id is required"),
  voltage_v: z.number().min(0).max(300),
  current_a: z.number().min(0).max(100),
  power_w: z.number().min(0).max(30000),
  energy_kwh: z.number().min(0).optional(),
  frequency_hz: z.number().min(40).max(70).optional(),
  power_factor: z.number().min(0).max(1).optional(),
  recorded_at: z.string().datetime({ offset: true }).optional(),
});

const ingestBodySchema = z.object({
  readings: z.array(readingItemSchema).min(1).max(100),
  user_id: z.string().min(1, "user_id is required"),
});

/**
 * POST /api/v1/ingest/readings
 *
 * Accepts readings from the Python PZEM-004T collector.
 * Auto-registers devices if they don't exist yet.
 */
router.post(
  "/readings",
  validate({ body: ingestBodySchema }),
  async (req: Request, res: Response): Promise<void> => {
    const { readings: items, user_id } = req.body as z.infer<
      typeof ingestBodySchema
    >;

    const results = [];

    for (const item of items) {
      // ── Resolve or auto-register device ────────────────────────
      let deviceRecord = await db.query.device.findFirst({
        where: eq(device.deviceId, item.device_id),
      });

      if (!deviceRecord) {
        const [newDevice] = await db
          .insert(device)
          .values({
            userId: user_id,
            deviceId: item.device_id,
            name: `PZEM ${item.device_id}`,
            location: "Sin asignar",
            isActive: true,
          })
          .returning();

        deviceRecord = newDevice;
        console.log(`📡 Auto-registered new device: ${item.device_id}`);
      }

      // ── Insert reading ─────────────────────────────────────────
      const [inserted] = await db
        .insert(reading)
        .values({
          deviceId: deviceRecord.id,
          voltageV: item.voltage_v,
          currentA: item.current_a,
          powerW: item.power_w,
          energyKwh: item.energy_kwh ?? null,
          frequencyHz: item.frequency_hz ?? null,
          powerFactor: item.power_factor ?? null,
          recordedAt: item.recorded_at
            ? new Date(item.recorded_at)
            : new Date(),
        })
        .returning({ id: reading.id });

      results.push({
        device_id: item.device_id,
        reading_id: inserted.id,
        status: "ok",
      });
    }

    res.status(201).json(
      successResponse({
        ingested: results.length,
        results,
      }),
    );
  },
);

export default router;
