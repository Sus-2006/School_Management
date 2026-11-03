import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllParents,
  createParent,
} from "../services/parent.service";

const createParentSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  motherName: z.string().min(1, "Mother name is required"),
  phone: z.string().min(5, "Phone number is required"),
  email: z.string().email().optional(),
  address: z.string().optional(),
});

export async function getParents(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parents = await getAllParents();

    res.json({
      success: true,
      data: parents,
    });
  } catch (error) {
    next(error);
  }
}

export async function createParentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createParentSchema.parse(req.body);

    const parent = await createParent(
      data.fatherName,
      data.motherName,
      data.phone,
      data.email,
      data.address,
    );

    res.status(201).json({
      success: true,
      data: parent,
    });
  } catch (error) {
    next(error);
  }
}