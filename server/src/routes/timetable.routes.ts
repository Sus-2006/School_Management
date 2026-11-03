import { Router } from "express";
import {
  getTimetables,
  createTimetableController,
} from "../controllers/timetable.controller";

const router = Router();

router.get("/", getTimetables);
router.post("/", createTimetableController);

export default router;