import { Router } from "express";
import {
  getMarks,
  createMarkController,
} from "../controllers/mark.controller";

const router = Router();

router.get("/", getMarks);
router.post("/", createMarkController);

export default router;