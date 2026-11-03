import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllDrivers,
  createDriver,
} from "../services/driver.service";

const createDriverSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  phone: z.string().min(5, "Phone number is required"),
  licenseNo: z.string().optional(),
});

export async function getDrivers(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const drivers = await getAllDrivers();

    res.json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
}

export async function createDriverController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createDriverSchema.parse(req.body);

    const driver = await createDriver(
      data.name,
      data.phone,
      data.licenseNo,
    );

    res.status(201).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
}