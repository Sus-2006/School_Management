import { Router } from "express";
import {
  getNotices,
  createNoticeController,
} from "../controllers/notice.controller";

const router = Router();

router.get("/", getNotices);
router.post("/", createNoticeController);

export default router;