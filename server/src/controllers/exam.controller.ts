import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllExams,
  createExam,
} from "../services/exam.service";

const createExamSchema = z.object({
  name: z.string().min(1, "Exam name is required"),
  examDate: z.coerce.date().optional(),
});

export async function getExams(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const exams = await getAllExams();

    res.json({
      success: true,
      data: exams,
    });
  } catch (error) {
    next(error);
  }
}

export async function createExamController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createExamSchema.parse(req.body);

    const exam = await createExam(
      data.name,
      data.examDate,
    );

    res.status(201).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    next(error);
  }
}