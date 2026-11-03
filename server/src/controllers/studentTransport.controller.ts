import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllStudentTransports,
  createStudentTransport,
} from "../services/studentTransport.service";

const createStudentTransportSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  busId: z.string().min(1, "Bus ID is required"),
  routeId: z.string().min(1, "Route ID is required"),
  stopId: z.string().min(1, "Stop ID is required"),
  startDate: z.coerce.date().optional(),
});

export async function getStudentTransports(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const transports = await getAllStudentTransports();

    res.json({
      success: true,
      data: transports,
    });
  } catch (error) {
    next(error);
  }
}

export async function createStudentTransportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createStudentTransportSchema.parse(req.body);

    const transport = await createStudentTransport(
      data.studentId,
      data.busId,
      data.routeId,
      data.stopId,
      data.startDate,
    );

    res.status(201).json({
      success: true,
      data: transport,
    });
  } catch (error) {
    next(error);
  }
}