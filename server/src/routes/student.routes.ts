import { Router } from "express";
import {
  getStudents,
  createStudentController,
} from "../controllers/student.controller";
import {
  authenticate,
  requireRole,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, getStudents);

router.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  createStudentController,
);

export default router;