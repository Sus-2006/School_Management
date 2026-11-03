import { Router } from "express";
import {
  getHomework,
  createHomeworkController,
} from "../controllers/homework.controller";

const router = Router();

router.get("/", getHomework);
router.post("/", createHomeworkController);

export default router;