import express from "express";
import { sendAns } from "../controllers/email.js";
const router = express.Router();
router.post("/mail", sendAns);

export default router;
