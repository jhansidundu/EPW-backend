// GET api/exams
// GET api/exams/:examId
// POST
import express from "express";
import { createExam } from "../controllers/createExams.js";
import { getExams } from "../controllers/getExams.js";
import { getExamswithId } from "../controllers/getExams.js";

import { authentication } from "../controllers/authentication.js";
const router = express.Router();
router.post("/createExam", authentication, createExam);
router.get("/getExams", authentication, getExams);
router.get("/getExams/:id", authentication, getExamswithId);

export default router;
