import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getAllNotices,
  createNotice,
} from "../services/notice.service";

const createNoticeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  audience: z.string().min(1, "Audience is required"),
  date: z.coerce.date().optional(),
});

export async function getNotices(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const notices = await getAllNotices();

    res.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNoticeController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createNoticeSchema.parse(req.body);

    const notice = await createNotice(
      data.title,
      data.content,
      data.audience,
      data.date,
    );

    res.status(201).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    next(error);
  }
}
