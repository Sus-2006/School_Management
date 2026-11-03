import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllClasses,
  createClass,
} from "../services/class.service";

const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  grade: z.number().int().min(1).max(12),
});

export async function getClasses(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const classes = await getAllClasses();

    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    next(error);
  }
}

export async function createClassController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createClassSchema.parse(req.body);

    const newClass = await createClass(
      data.name,
      data.grade,
    );

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
}