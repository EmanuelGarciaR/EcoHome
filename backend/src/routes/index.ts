import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import meRoutes from "./me.routes.js";
import readingsRoutes from "./readings.routes.js";
import alertsRoutes from "./alerts.routes.js";
import achievementsRoutes from "./achievements.routes.js";

const router = Router();

// All /api/v1 routes require authentication
router.use(requireAuth);

// Mount sub-routers
router.use("/me", meRoutes);
router.use("/readings", readingsRoutes);
router.use("/alerts", alertsRoutes);
router.use("/achievements", achievementsRoutes);

export default router;
