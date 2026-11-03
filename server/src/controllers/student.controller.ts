import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllStudents,
  createStudent,
} from "../services/student.service";

const createStudentSchema = z.object({
  admissionNo: z.string().min(1, "Admission number is required"),
  name: z.string().min(1, "Student name is required"),
  classId: z.string().min(1, "Class ID is required"),
  sectionId: z.string().min(1, "Section ID is required"),
  parentId: z.string().min(1, "Parent ID is required"),
  dob: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  bloodGroup: z.string().optional(),
});

export async function getStudents(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const students = await getAllStudents();

    res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
}

export async function createStudentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createStudentSchema.parse(req.body);
    console.log("STUDENT CREATE:", data);

    const student = await createStudent(
      data.admissionNo,
      data.name,
      data.classId,
      data.sectionId,
      data.parentId,
      data.dob,
      data.gender,
      data.bloodGroup,
    );

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
}