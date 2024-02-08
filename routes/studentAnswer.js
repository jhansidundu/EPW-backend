import express from "express";
import { answers } from "../controllers/studentAnswer.js";
const router = express.Router();
router.post("/attemptAnswers", answers);

export default router;
