import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllStops,
  createStop,
} from "../services/stop.service";

const createStopSchema = z.object({
  routeId: z.string().min(1, "Route ID is required"),
  name: z.string().min(1, "Stop name is required"),
  stopOrder: z.number().int().positive(),
  pickupTime: z.string().optional(),
  dropTime: z.string().optional(),
});

export async function getStops(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const stops = await getAllStops();

    res.json({
      success: true,
      data: stops,
    });
  } catch (error) {
    next(error);
  }
}

export async function createStopController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createStopSchema.parse(req.body);

    const stop = await createStop(
      data.routeId,
      data.name,
      data.stopOrder,
      data.pickupTime,
      data.dropTime,
    );

    res.status(201).json({
      success: true,
      data: stop,
    });
  } catch (error) {
    next(error);
  }
}