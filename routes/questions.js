import express from "express";

import {
  addQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
  getQuestionByexamId,
} from "../controllers/questions.js";
import { validateAccessToken } from "../util/middleware.js";
const router = express.Router();
router.post("/add", validateAccessToken, addQuestion);
router.post("/update/", validateAccessToken, updateQuestion);
router.delete("/:questionId", validateAccessToken, deleteQuestion);
router.get("/:questionId", validateAccessToken, getQuestion);
router.get(
  "/student/exam/:id/questions",
  validateAccessToken,
  getQuestionByexamId
);
export default router;
