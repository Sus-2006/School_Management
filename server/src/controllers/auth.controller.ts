import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

export async function getCurrentUser(
  req: AuthenticatedRequest,
  res: Response,
) {
  res.json({
    success: true,
    data: req.user,
  });
}