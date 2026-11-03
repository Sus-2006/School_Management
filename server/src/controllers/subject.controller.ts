import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllSubjects,
  createSubject,
} from "../services/subject.service";

const createSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().optional(),
});

export async function getSubjects(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const subjects = await getAllSubjects();

    res.json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
}

export async function createSubjectController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createSubjectSchema.parse(req.body);

    const subject = await createSubject(
      data.name,
      data.code,
    );

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    next(error);
  }
}