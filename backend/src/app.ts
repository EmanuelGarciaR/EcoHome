import express from "express";
import "express-async-errors";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/index.js";
import { env } from "./lib/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import ingestRoutes from "./routes/ingest.routes.js";
import v1Routes from "./routes/index.js";

const app = express();

// ── 1. CORS (must be before all routes) ────────────────────────────
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// ── 2. Better Auth handler (BEFORE express.json per BA docs) ───────
app.all("/api/auth/*", toNodeHandler(auth));

// ── 3. JSON body parser (after Better Auth) ────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── 4. Public routes ───────────────────────────────────────────────
app.use("/api/health", healthRoutes);

// ── 5. IoT device ingestion (API-key auth, not session auth) ───────
app.use("/api/v1/ingest", ingestRoutes);

// ── 6. Protected v1 API routes ─────────────────────────────────────
app.use("/api/v1", v1Routes);

// ── 7. Centralized error handler (must be last) ────────────────────
app.use(errorHandler);

export default app;
