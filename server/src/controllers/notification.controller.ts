import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllNotifications,
  getNotificationsByUser,
  createNotification,
} from "../services/notification.service";

const createNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  type: z.string().optional(),
});

export async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.query.userId as string | undefined;

    const notifications = userId
      ? await getNotificationsByUser(userId)
      : await getAllNotifications();

    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNotificationController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createNotificationSchema.parse(req.body);

    const notification = await createNotification(
      data.userId,
      data.title,
      data.body,
      data.type,
    );

    res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
}