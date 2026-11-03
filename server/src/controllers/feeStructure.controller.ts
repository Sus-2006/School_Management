import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllFeeStructures,
  createFeeStructure,
} from "../services/feeStructure.service";

const createFeeStructureSchema = z.object({
  name: z.string().min(1, "Fee name is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
});

export async function getFeeStructures(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const fees = await getAllFeeStructures();

    res.json({
      success: true,
      data: fees,
    });
  } catch (error) {
    next(error);
  }
}

export async function createFeeStructureController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createFeeStructureSchema.parse(req.body);

    const fee = await createFeeStructure(
      data.name,
      data.amount,
      data.description,
    );

    res.status(201).json({
      success: true,
      data: fee,
    });
  } catch (error) {
    next(error);
  }
}