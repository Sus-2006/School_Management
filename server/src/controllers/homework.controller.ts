import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllHomework,
  createHomework,
} from "../services/homework.service";

const createHomeworkSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  teacherId: z.string().min(1, "Teacher ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.coerce.date(),
  attachmentUrl: z.string().url().optional(),
});

export async function getHomework(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const homework = await getAllHomework();

    res.json({
      success: true,
      data: homework,
    });
  } catch (error) {
    next(error);
  }
}

export async function createHomeworkController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createHomeworkSchema.parse(req.body);

    const homework = await createHomework(
      data.classId,
      data.subjectId,
      data.teacherId,
      data.title,
      data.description,
      data.dueDate,
      data.attachmentUrl,
    );

    res.status(201).json({
      success: true,
      data: homework,
    });
  } catch (error) {
    next(error);
  }
}