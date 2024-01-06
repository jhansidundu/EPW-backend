import express from "express";
import { registerUser, validatePass } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", validatePass);

export default router;
