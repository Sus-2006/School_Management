import { Router } from "express";
import {
  getParents,
  createParentController,
} from "../controllers/parent.controller";

const router = Router();

router.get("/", getParents);
router.post("/", createParentController);

export default router;