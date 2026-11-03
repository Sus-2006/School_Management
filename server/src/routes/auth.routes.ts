import { Router } from "express";
import { getCurrentUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticate, getCurrentUser);

export default router;