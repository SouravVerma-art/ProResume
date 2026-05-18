import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import connectDB from "./configs/db.js";
import authRouter from "./routes/authRoutes.js";
import resumeRouter from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Force port 8081 because 8080 is often taken by other services (like Apache/httpd)
const PORT = process.env.PORT && process.env.PORT !== "8080" ? process.env.PORT : 8081;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for easier deployment, re-enable with config if needed
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // set `RateLimit` and `RateLimit-Policy` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { message: "Too many requests from this IP, please try again after 15 minutes" }
});
app.use("/api/", limiter);

// Database connection
await connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Serve Static Files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle React Routing (SPA)
app.get("*all", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Global Error Handler (Must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running`);
  console.log(`👉 http://localhost:${PORT}`);
});
