import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllTimetables,
  createTimetable,
} from "../services/timetable.service";

const createTimetableSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  day: z.string().min(1, "Day is required"),
  period: z.number().int().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export async function getTimetables(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const timetables = await getAllTimetables();

    res.json({
      success: true,
      data: timetables,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTimetableController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createTimetableSchema.parse(req.body);

    const timetable = await createTimetable(
      data.classId,
      data.subjectId,
      data.teacherId,
      data.day,
      data.period,
      data.startTime,
      data.endTime,
    );

    res.status(201).json({
      success: true,
      data: timetable,
    });
  } catch (error) {
    next(error);
  }
}