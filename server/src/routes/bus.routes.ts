import { Router } from "express";
import {
  getBuses,
  createBusController,
} from "../controllers/bus.controller";

const router = Router();

router.get("/", getBuses);
router.post("/", createBusController);

export default router;