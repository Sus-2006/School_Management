import { Router } from "express";
import {
  getExams,
  createExamController,
} from "../controllers/exam.controller";

const router = Router();

router.get("/", getExams);
router.post("/", createExamController);

export default router;