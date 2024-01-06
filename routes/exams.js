// GET api/exams
// GET api/exams/:examId
// POST
import express from "express";
import { createExam } from "../controllers/exams.js";
import { authentication } from "../controllers/authentication.js";
const router = express.Router();
router.post("/createExam", authentication, createExam);
export default router;
