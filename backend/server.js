import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";

dotenv.config();

if (!process.env.PORT) {
  console.error("❌ PORT missing in .env file");
  process.exit(1);
}

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Hostel Management API Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`
🚀 Server Started
🌐 Port : ${PORT}
📦 Mode : ${process.env.NODE_ENV}
`)
);
