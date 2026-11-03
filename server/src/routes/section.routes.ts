import { Router } from "express";
import {
  getSections,
  createSectionController,
} from "../controllers/section.controller";

const router = Router();

router.get("/", getSections);
router.post("/", createSectionController);

export default router;