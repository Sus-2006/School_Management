import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllStudentFees,
  createStudentFee,
} from "../services/studentFee.service";

const createStudentFeeSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  feeStructureId: z.string().min(1, "Fee structure ID is required"),
  totalAmount: z.number().positive("Total amount must be positive"),
  paidAmount: z.number().min(0, "Paid amount cannot be negative"),
  dueDate: z.coerce.date().optional(),
});

export async function getStudentFees(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const fees = await getAllStudentFees();

    res.json({
      success: true,
      data: fees,
    });
  } catch (error) {
    next(error);
  }
}

export async function createStudentFeeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createStudentFeeSchema.parse(req.body);

    if (data.paidAmount > data.totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot exceed total amount",
      });
    }

    const fee = await createStudentFee(
      data.studentId,
      data.feeStructureId,
      data.totalAmount,
      data.paidAmount,
      data.dueDate,
    );

    res.status(201).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    next(error);
  }
}