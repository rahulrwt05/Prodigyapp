import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // ✅ Fix Typo
import express from "express";
import morgan from "morgan";
import { dbConnection } from "./utils/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js";
import routes from "./routes/index.js";

// Resolving __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config();

// Connect to Database
dbConnection();

const PORT = process.env.PORT || 8000;

const app = express();

// Enable CORS for frontend on Vercel
app.use(
  cors({
    origin: "https://prodigyapp.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure headers are allowed
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// ONLY serve frontend if it's hosted on the same server
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  // Render frontend for any path
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
  );
}

// Error Handling Middleware
app.use(routeNotFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
