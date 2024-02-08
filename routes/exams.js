// GET api/exams
// GET api/exams/:examId
// POST
import express from "express";
import { createExam } from "../controllers/exams.js";
import { getExams } from "../controllers/exams.js";
import { getExamswithId } from "../controllers/exams.js";
import { deleteExam } from "../controllers/exams.js";
import { authentication } from "../controllers/authentication.js";
import { getQuestionsWithExam } from "../controllers/exams.js";
import { getExamDetails } from "../controllers/exams.js";
const router = express.Router();
router.post("/createExam", authentication, createExam);
router.get("/getExams", authentication, getExams);
router.get("/getExams/:id", authentication, getExamswithId);
router.get("/deleteExam/:id", authentication, deleteExam);
router.get("/getquestions", authentication, getQuestionsWithExam);
router.get("/getexamdetails", authentication, getExamDetails);

export default router;
