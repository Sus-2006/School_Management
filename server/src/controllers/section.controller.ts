import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllSections,
  createSection,
} from "../services/section.service";

const createSectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  classId: z.string().min(1, "Class ID is required"),
});

export async function getSections(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const sections = await getAllSections();

    res.json({
      success: true,
      data: sections,
    });
  } catch (error) {
    next(error);
  }
}

export async function createSectionController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createSectionSchema.parse(req.body);

    const section = await createSection(
      data.name,
      data.classId,
    );

    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error) {
    next(error);
  }
}