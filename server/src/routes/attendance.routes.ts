import { Router } from "express";
import {
  getAttendance,
  createAttendanceController,
} from "../controllers/attendance.controller";

const router = Router();

router.get("/", getAttendance);
router.post("/", createAttendanceController);

export default router;