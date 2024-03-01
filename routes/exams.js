import express from "express";
import { getEnrolledUsers } from "../controllers/enrollUsers.js";
import {
  checkIfExamisActive,
  createExam,
  deleteExam,
  getExamDetails,
  getExamStatusList,
  getExams,
  getExamswithId,
  updateExam,
  updateExamSettings,
} from "../controllers/exams.js";
import { getQuestionsByExam } from "../controllers/questions.js";
import { validateAccessToken } from "../util/middleware.js";
const router = express.Router();
router.get("/", validateAccessToken, getExams);
router.get("/status", getExamStatusList);
router.get("/teacher", validateAccessToken, getExams);
router.post("/add", validateAccessToken, createExam);
router.post("/:examId/update", validateAccessToken, updateExam);
router.post("/update/settings", validateAccessToken, updateExamSettings);
router.get("/details/:id", validateAccessToken, getExamDetails);
router.get("/:id", validateAccessToken, getExamswithId);
router.delete("/:id", validateAccessToken, deleteExam);
router.get("/:examId/questions", validateAccessToken, getQuestionsByExam);
router.get("/:examId/enrollments", validateAccessToken, getEnrolledUsers);
router.get("/:examId/active", validateAccessToken, checkIfExamisActive);
export default router;
