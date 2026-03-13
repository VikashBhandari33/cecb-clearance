import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import applicationRoutes from "./routes/applications/application.routes";
app.use("/api/applications", applicationRoutes);

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get("/health", (_, res) => res.json({ status: "ok" }));

// Routes registered here later
// app.use("/api/auth", authRoutes);

app.use(errorHandler);