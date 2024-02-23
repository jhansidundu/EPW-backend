// GET api/exams
// GET api/exams/:examId
// POST
import express from "express";
import {
  createExam,
  deleteExam,
  getExamDetails,
  getExamStatusList,
  getExams,
  getExamswithId,
  updateExamSettings,
} from "../controllers/exams.js";
import { validateAccessToken } from "../util/middleware.js";
import { getQuestionsByExam } from "../controllers/questions.js";
const router = express.Router();
router.get("/", validateAccessToken, getExams);
router.get("/status", getExamStatusList);
router.get("/teacher", validateAccessToken, getExams);
router.post("/add", validateAccessToken, createExam);
router.post("/update/settings", validateAccessToken, updateExamSettings);
router.get("/details/:id", validateAccessToken, getExamDetails);
router.get("/:id", validateAccessToken, getExamswithId);
router.delete("/:id", validateAccessToken, deleteExam);
router.get("/:examId/questions", validateAccessToken, getQuestionsByExam);

export default router;
