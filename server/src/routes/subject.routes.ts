import { Router } from "express";
import {
  getSubjects,
  createSubjectController,
} from "../controllers/subject.controller";

const router = Router();

router.get("/", getSubjects);
router.post("/", createSubjectController);

export default router;