import { Router } from "express";
import {
  getNotifications,
  createNotificationController,
} from "../controllers/notification.controller";

const router = Router();

router.get("/", getNotifications);
router.post("/", createNotificationController);

export default router;