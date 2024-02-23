import express from "express";
import { enrollUsers } from "../controllers/enrollUsers.js";
import { validateAccessToken } from "../util/middleware.js";
const router = express.Router();
router.post("/students", validateAccessToken, enrollUsers);
export default router;
