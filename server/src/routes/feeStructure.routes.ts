import { Router } from "express";
import {
  getFeeStructures,
  createFeeStructureController,
} from "../controllers/feeStructure.controller";

const router = Router();

router.get("/", getFeeStructures);
router.post("/", createFeeStructureController);

export default router;