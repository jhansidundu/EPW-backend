import express from "express";
import adminRoutes from "./admin.js";
import userRoutes from "./auth.js";
import enrollUsersRoutes from "./enrollUsers.js";
import examRoutes from "./exams.js";
import questionRoutes from "./questions.js";
import Answers from "./studentAnswer.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/enroll", enrollUsersRoutes);
router.use("/answers", Answers);
router.use("/admin", adminRoutes);
router.use("/exam", examRoutes);
router.use("/question", questionRoutes);

export default router;
