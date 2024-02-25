import express from "express";
import { studentExams } from "../controllers/getStudentExams.js";
const router = express.Router();
import { validateAccessToken } from "../util/middleware.js";

router.get("/enrollexams", validateAccessToken, studentExams);

export default router;
