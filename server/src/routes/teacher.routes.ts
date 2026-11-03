import { Router } from "express";
import {
  getTeachers,
  createTeacherController,
} from "../controllers/teacher.controller";

const router = Router();

router.get("/", getTeachers);
router.post("/", createTeacherController);

export default router;