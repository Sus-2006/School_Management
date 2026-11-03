import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllRoutes,
  createRoute,
} from "../services/route.service";

const createRouteSchema = z.object({
  name: z.string().min(1, "Route name is required"),
  busId: z.string().optional(),
});

export async function getRoutes(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const routes = await getAllRoutes();

    res.json({
      success: true,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
}

export async function createRouteController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createRouteSchema.parse(req.body);

    const route = await createRoute(
      data.name,
      data.busId,
    );

    res.status(201).json({
      success: true,
      data: route,
    });
  } catch (error) {
    next(error);
  }
}