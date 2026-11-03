import { Router } from "express";
import {
  getClasses,
  createClassController,
} from "../controllers/class.controller";

const router = Router();

router.get("/", getClasses);
router.post("/", createClassController);

export default router;