import { Router } from "express";
import {
  getClassSubjects,
  createClassSubjectController,
} from "../controllers/classSubject.controller";

const router = Router();

router.get("/", getClassSubjects);
router.post("/", createClassSubjectController);

export default router;