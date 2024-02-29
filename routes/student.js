import express from "express";
import { getStudentExams } from "../controllers/exams.js";
import { getQuestionsByExamIdForStudents } from "../controllers/questions.js";
import {
  completeStudentAutoEnrollment,
  completeStudentEnrollment,
  finishExam,
  markStartExam,
  saveAnswer,
} from "../controllers/student.js";
import {
  enrollmentMiddleWare,
  validateAccessToken,
} from "../util/middleware.js";
const router = express.Router();

router.get("/exams", validateAccessToken, getStudentExams);
router.post("/exam/:examId/finish", validateAccessToken, finishExam);
router.get("/exam/:examId/start", validateAccessToken, markStartExam);
router.post("/exam/question/answer", validateAccessToken, saveAnswer);
router.post(
  "/auto-enroll",
  enrollmentMiddleWare,
  completeStudentAutoEnrollment
);
router.post("/enroll", validateAccessToken, completeStudentEnrollment);
router.get(
  "/exam/:examId/questions",
  validateAccessToken,
  getQuestionsByExamIdForStudents
);

export default router;
