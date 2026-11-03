import "dotenv/config";
import express from "express";
import cors from "cors";
import subjectRoutes from "./routes/subject.routes";
import classRoutes from "./routes/class.routes";
import sectionRoutes from "./routes/section.routes";
import parentRoutes from "./routes/parent.routes";
import studentRoutes from "./routes/student.routes";
import teacherRoutes from "./routes/teacher.routes";
import classSubjectRoutes from "./routes/classSubject.routes";
import timetableRoutes from "./routes/timetable.routes";
import attendanceRoutes from "./routes/attendance.routes";
import examRoutes from "./routes/exam.routes";
import markRoutes from "./routes/mark.routes";
import homeworkRoutes from "./routes/homework.routes";
import driverRoutes from "./routes/driver.routes";
import busRoutes from "./routes/bus.routes";
import routeRoutes from "./routes/route.routes";
import stopRoutes from "./routes/stop.routes";
import studentTransportRoutes from "./routes/studentTransport.routes";
import feeStructureRoutes from "./routes/feeStructure.routes";
import studentFeeRoutes from "./routes/studentFee.routes";
import noticeRoutes from "./routes/notice.routes";
import notificationRoutes from "./routes/notification.routes";
import authRoutes from "./routes/auth.routes";
import { databaseUrl, db } from "./prisma/db";
import { ZodError } from "zod";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", (req, res, next) => {
  if (req.path !== "/health" && !databaseUrl) {
    return res.status(503).json({
      success: false,
      message: "Database is not configured. Set DATABASE_URL in server/.env.",
    });
  }
  next();
});

const shutdown = async () => {
  await db.close();
  process.exit(0);
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

// Routes
app.use("/api/classes", classRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes)
app.use("/api/class-subjects", classSubjectRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/homework", homeworkRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/student-transports", studentTransportRoutes);
app.use("/api/fee-structures", feeStructureRoutes);
app.use("/api/student-fees", studentFeeRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "School Management API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ success: false, message: "Invalid request data", errors: error.flatten() });
  }
  console.error("Unhandled API error", error);
  return res.status(500).json({ success: false, message: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
