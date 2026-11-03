import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllTeachers,
  createTeacher,
} from "../services/teacher.service";

const createTeacherSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  photoUrl: z.string().url().optional(),
});

export async function getTeachers(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const teachers = await getAllTeachers();

    res.json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
}

export async function createTeacherController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createTeacherSchema.parse(req.body);

    const teacher = await createTeacher(
      data.employeeId,
      data.firstName,
      data.lastName,
      data.phone,
      data.email,
      data.photoUrl,
    );

    res.status(201).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    next(error);
  }
}