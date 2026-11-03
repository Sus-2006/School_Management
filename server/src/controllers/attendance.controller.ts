import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllAttendance,
  createAttendance,
} from "../services/attendance.service";

const createAttendanceSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  date: z.coerce.date(),
  status: z.enum(["PRESENT", "ABSENT", "LATE", "LEAVE"]),
});

export async function getAttendance(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const attendance = await getAllAttendance();

    res.json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAttendanceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createAttendanceSchema.parse(req.body);

    const attendance = await createAttendance(
      data.studentId,
      data.date,
      data.status,
    );

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
}