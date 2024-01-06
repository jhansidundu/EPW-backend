import express from "express";

import { addQuestions } from "../controllers/questions.js";
import { authentication } from "../controllers/authentication.js";
const router = express.Router();
router.post("/questions", authentication, addQuestions);

export default router;
