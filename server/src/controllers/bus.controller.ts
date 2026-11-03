import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllBuses,
  createBus,
} from "../services/bus.service";

const createBusSchema = z.object({
  busNumber: z.string().min(1, "Bus number is required"),
  registrationNo: z.string().min(1, "Registration number is required"),
  capacity: z.number().int().positive("Capacity must be positive"),
  driverId: z.string().optional(),
  attendantName: z.string().optional(),
  attendantPhone: z.string().optional(),
});

export async function getBuses(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const buses = await getAllBuses();

    res.json({
      success: true,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
}

export async function createBusController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createBusSchema.parse(req.body);

    const bus = await createBus(
      data.busNumber,
      data.registrationNo,
      data.capacity,
      data.driverId,
      data.attendantName,
      data.attendantPhone,
    );

    res.status(201).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
}