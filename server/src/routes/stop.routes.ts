import { Router } from "express";
import {
  getStops,
  createStopController,
} from "../controllers/stop.controller";

console.log("STOP ROUTER LOADED");

const router = Router();

router.get("/", getStops);
router.post("/", createStopController);

export default router;
