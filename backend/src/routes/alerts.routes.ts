import { Router } from "express";
import type { Response } from "express";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "../db/index.js";
import { alert } from "../db/schema.js";
import type { AuthenticatedRequest } from "../lib/types.js";
import { successResponse } from "../lib/types.js";
import { validate } from "../middleware/validate.middleware.js";
import { AppError } from "../lib/app-error.js";

const router = Router();

/**
 * GET /api/v1/alerts
 * Returns all alerts for the authenticated user, newest first.
 */
router.get("/", async (req, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  const alerts = await db
    .select()
    .from(alert)
    .where(eq(alert.userId, authReq.user.id))
    .orderBy(desc(alert.createdAt));

  res.json(successResponse(alerts));
});

/**
 * PATCH /api/v1/alerts/:id/read
 * Marks an alert as read (isNew = false).
 */
const alertParamsSchema = z.object({
  id: z.string().uuid("Invalid alert ID"),
});

router.patch(
  "/:id/read",
  validate({ params: alertParamsSchema }),
  async (req, res: Response): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    const { id } = req.params as unknown as z.infer<typeof alertParamsSchema>;

    const [updated] = await db
      .update(alert)
      .set({ isNew: false })
      .where(and(eq(alert.id, id), eq(alert.userId, authReq.user.id)))
      .returning();

    if (!updated) {
      throw AppError.notFound("Alert not found");
    }

    res.json(successResponse(updated));
  },
);

export default router;
