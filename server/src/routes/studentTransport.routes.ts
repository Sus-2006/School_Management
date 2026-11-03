import { Router } from "express";
import {
  getStudentTransports,
  createStudentTransportController,
} from "../controllers/studentTransport.controller";

const router = Router();

router.get("/", getStudentTransports);
router.post("/", createStudentTransportController);

export default router;