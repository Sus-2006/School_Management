import { Router } from "express";
import {
  getRoutes,
  createRouteController,
} from "../controllers/route.controller";

const router = Router();

router.get("/", getRoutes);
router.post("/", createRouteController);

export default router;