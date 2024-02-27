import { studentAnswersforExam } from "../controllers/studentAnswers.js";
import { validateAccessToken } from "../util/middleware.js";
import express from "express";

const router = express.Router();

router.post(
  "/exam/question/answer",
  validateAccessToken,
  studentAnswersforExam
);

export default router;
