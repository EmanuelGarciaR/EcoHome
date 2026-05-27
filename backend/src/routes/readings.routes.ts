import { Router } from "express";
import type { Response } from "express";
import { eq, and, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import {
  device,
  reading,
  hourlyStats,
  dailyStats,
  rangeStats,
} from "../db/schema.js";
import type { AuthenticatedRequest } from "../lib/types.js";
import { successResponse } from "../lib/types.js";
import { validate } from "../middleware/validate.middleware.js";
import { AppError } from "../lib/app-error.js";

const router = Router();

// ── Shared query schema ────────────────────────────────────────────
const deviceQuerySchema = z.object({
  deviceId: z.string().optional(),
});

// ── Helper: resolve device for the authenticated user ──────────────
async function resolveDevice(
  userId: string,
  deviceIdParam?: string,
): Promise<string> {
  if (userId === "dev-user") {
    const firstDevice = await db.query.device.findFirst();
    if (!firstDevice) throw AppError.notFound("No devices found in DB");
    return firstDevice.id;
  }

  if (deviceIdParam) {
    let found = await db.query.device.findFirst({
      where: and(
        eq(device.deviceId, deviceIdParam),
        eq(device.userId, userId),
      ),
    });
    if (!found) {
      // Fallback: allow accessing a global device if it exists
      found = await db.query.device.findFirst({
        where: eq(device.deviceId, deviceIdParam),
      });
    }
    if (!found) {
      throw AppError.notFound("Device not found");
    }
    return found.id;
  }

  // Default to first active device for the user
  let defaultDevice = await db.query.device.findFirst({
    where: and(eq(device.userId, userId), eq(device.isActive, true)),
  });

  if (!defaultDevice) {
    // Fallback: Use the very first device in the database for demonstration
    defaultDevice = await db.query.device.findFirst();
  }

  if (!defaultDevice) {
    throw AppError.notFound("No active device found in system");
  }

  return defaultDevice.id;
}

/**
 * GET /api/v1/readings/latest
 * Returns the latest raw reading for a device.
 */
router.get(
  "/latest",
  validate({ query: deviceQuerySchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { deviceId: deviceIdParam } = req.query as z.infer<
      typeof deviceQuerySchema
    >;

    const deviceUuid = await resolveDevice(authReq.user.id, deviceIdParam);

    const latestReading = await db.query.reading.findFirst({
      where: eq(reading.deviceId, deviceUuid),
      orderBy: desc(reading.recordedAt),
    });

    if (!latestReading) {
      throw AppError.notFound("No readings found");
    }

    res.json(successResponse(latestReading));
  },
);

/**
 * GET /api/v1/readings/hourly
 * Returns hourly time-series aggregations.
 */
router.get(
  "/hourly",
  validate({ query: deviceQuerySchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { deviceId: deviceIdParam } = req.query as z.infer<
      typeof deviceQuerySchema
    >;

    const deviceUuid = await resolveDevice(authReq.user.id, deviceIdParam);

    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    const data = await db
      .select({
        timestamp: sql<string>`DATE_TRUNC('hour', ${reading.recordedAt})`,
        avgPowerW: sql<number>`COALESCE(AVG(${reading.powerW}), 0)`,
        maxPowerW: sql<number>`COALESCE(MAX(${reading.powerW}), 0)`,
        minPowerW: sql<number>`COALESCE(MIN(${reading.powerW}), 0)`,
        kwh: sql<number>`COALESCE(MAX(${reading.energyKwh}) - MIN(${reading.energyKwh}), 0)`,
      })
      .from(reading)
      .where(
        and(
          eq(reading.deviceId, deviceUuid),
          sql`${reading.recordedAt} >= ${oneDayAgo.toISOString()}`,
        )
      )
      .groupBy(sql`DATE_TRUNC('hour', ${reading.recordedAt})`)
      .orderBy(sql`DATE_TRUNC('hour', ${reading.recordedAt})`);

    res.json(successResponse(data));
  },
);

/**
 * GET /api/v1/readings/daily
 * Returns daily time-series aggregations.
 */
router.get(
  "/daily",
  validate({ query: deviceQuerySchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { deviceId: deviceIdParam } = req.query as z.infer<
      typeof deviceQuerySchema
    >;

    const deviceUuid = await resolveDevice(authReq.user.id, deviceIdParam);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const data = await db
      .select({
        timestamp: sql<string>`DATE_TRUNC('day', ${reading.recordedAt})`,
        avgPowerW: sql<number>`COALESCE(AVG(${reading.powerW}), 0)`,
        maxPowerW: sql<number>`COALESCE(MAX(${reading.powerW}), 0)`,
        minPowerW: sql<number>`COALESCE(MIN(${reading.powerW}), 0)`,
        kwh: sql<number>`COALESCE(MAX(${reading.energyKwh}) - MIN(${reading.energyKwh}), 0)`,
      })
      .from(reading)
      .where(
        and(
          eq(reading.deviceId, deviceUuid),
          sql`${reading.recordedAt} >= ${thirtyDaysAgo.toISOString()}`,
        )
      )
      .groupBy(sql`DATE_TRUNC('day', ${reading.recordedAt})`)
      .orderBy(sql`DATE_TRUNC('day', ${reading.recordedAt})`);

    res.json(successResponse(data));
  },
);

/**
 * GET /api/v1/readings/range?period=mensual|trimestral|anual
 * Returns period comparison data.
 */
const rangeQuerySchema = z.object({
  period: z.enum(["mensual", "trimestral", "anual"]),
  deviceId: z.string().optional(),
});

router.get(
  "/range",
  validate({ query: rangeQuerySchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { period, deviceId: deviceIdParam } = req.query as z.infer<
      typeof rangeQuerySchema
    >;

    const deviceUuid = await resolveDevice(authReq.user.id, deviceIdParam);

    const data = await db
      .select()
      .from(rangeStats)
      .where(
        and(
          eq(rangeStats.deviceId, deviceUuid),
          eq(rangeStats.period, period),
        ),
      );

    res.json(successResponse(data));
  },
);

/**
 * GET /api/v1/readings/summary
 * Returns computed stats summary for the dashboard.
 */
router.get(
  "/summary",
  validate({ query: deviceQuerySchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { deviceId: deviceIdParam } = req.query as z.infer<
      typeof deviceQuerySchema
    >;

    const deviceUuid = await resolveDevice(authReq.user.id, deviceIdParam);

    // Latest reading for current power
    const latestReading = await db.query.reading.findFirst({
      where: eq(reading.deviceId, deviceUuid),
      orderBy: desc(reading.recordedAt),
    });

    // Today's kWh from hourly stats
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayData = await db
      .select({
        totalKwh: sql<number>`COALESCE(MAX(${reading.energyKwh}) - MIN(${reading.energyKwh}), 0)`,
        peakPower: sql<number>`COALESCE(MAX(${reading.powerW}), 0)`,
      })
      .from(reading)
      .where(
        and(
          eq(reading.deviceId, deviceUuid),
          sql`${reading.recordedAt} >= ${todayStart.toISOString()}`,
        ),
      );

    // This month's kWh from daily stats
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthData = await db
      .select({
        totalKwh: sql<number>`COALESCE(MAX(${reading.energyKwh}) - MIN(${reading.energyKwh}), 0)`,
        dayCount: sql<number>`COUNT(DISTINCT DATE_TRUNC('day', ${reading.recordedAt}))`,
      })
      .from(reading)
      .where(
        and(
          eq(reading.deviceId, deviceUuid),
          sql`${reading.recordedAt} >= ${monthStart.toISOString()}`,
        ),
      );

    const todayRow = todayData[0];
    const monthRow = monthData[0];

    // Cost estimation (Colombian energy rate ~$600 COP per kWh)
    const costPerKwh = 600;
    const monthKwh = monthRow?.totalKwh ?? 0;
    const monthCostCop = monthKwh * costPerKwh;

    // Savings estimate (assume 10% savings compared to baseline)
    const monthSavingsCop = monthCostCop * 0.1;

    // CO2 offset (~0.2 kg per kWh saved)
    const co2KgOffset = (monthKwh * 0.1) * 0.2;

    const summary = {
      current_power_w: latestReading?.powerW ?? 0,
      today_kwh: todayRow?.totalKwh ?? 0,
      month_kwh: monthKwh,
      month_cost_cop: monthCostCop,
      month_savings_cop: monthSavingsCop,
      peak_power_w: todayRow?.peakPower ?? 0,
      peak_time: "N/A",
      avg_daily_kwh: monthRow ? (monthKwh / (monthRow.dayCount || 1)) : 0,
      co2_kg_offset: Math.round(co2KgOffset * 100) / 100,
      trees_equivalent: Math.round(co2KgOffset / 21.77), // ~21.77 kg CO2 per tree per year
    };

    res.json(successResponse(summary));
  },
);

export default router;
