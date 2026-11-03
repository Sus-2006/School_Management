import { Router } from "express";
import {
  getDrivers,
  createDriverController,
} from "../controllers/driver.controller";

const router = Router();

router.get("/", getDrivers);
router.post("/", createDriverController);

export default router;
