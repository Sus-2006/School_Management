import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllClassSubjects,
  createClassSubject,
} from "../services/classSubject.service";

const createClassSubjectSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  subjectId: z.string().min(1, "Subject ID is required"),
});

export async function getClassSubjects(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const classSubjects = await getAllClassSubjects();

    res.json({
      success: true,
      data: classSubjects,
    });
  } catch (error) {
    next(error);
  }
}

export async function createClassSubjectController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createClassSubjectSchema.parse(req.body);

    const classSubject = await createClassSubject(
      data.classId,
      data.subjectId,
    );

    res.status(201).json({
      success: true,
      data: classSubject,
    });
  } catch (error) {
    next(error);
  }
}