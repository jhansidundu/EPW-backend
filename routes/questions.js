import express from "express";

import { addQuestions } from "../controllers/questions.js";
import { authentication } from "../controllers/authentication.js";
import { updatequestions } from "../controllers/questions.js";
const router = express.Router();
router.post("/addquestions", authentication, addQuestions);
router.post("/updatequestions/:id", authentication, updatequestions);

export default router;
