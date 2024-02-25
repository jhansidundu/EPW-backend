import express from "express";
import { studentExams } from "../controllers/getStudentExams.js";
const router = express.Router();

router.get("/exams", studentExams);

export default router;
