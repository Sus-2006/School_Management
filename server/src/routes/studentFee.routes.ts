import { Router } from "express";
import {
  getStudentFees,
  createStudentFeeController,
} from "../controllers/studentFee.controller";

const router = Router();

router.get("/", getStudentFees);
router.post("/", createStudentFeeController);

export default router;