import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllMarks,
  createMark,
} from "../services/mark.service";

const createMarkSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
  examId: z.string().min(1, "Exam ID is required"),
  marks: z.number().min(0),
  maxMarks: z.number().positive().default(100),
});

export async function getMarks(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const marks = await getAllMarks();

    res.json({
      success: true,
      data: marks,
    });
  } catch (error) {
    next(error);
  }
}

export async function createMarkController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createMarkSchema.parse(req.body);

    if (data.marks > data.maxMarks) {
      return res.status(400).json({
        success: false,
        message: "Marks cannot exceed maximum marks",
      });
    }

    const mark = await createMark(
      data.studentId,
      data.subjectId,
      data.examId,
      data.marks,
      data.maxMarks,
    );

    res.status(201).json({
      success: true,
      data: mark,
    });
  } catch (error) {
    next(error);
  }
}
