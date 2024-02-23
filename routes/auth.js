import express from "express";
import { login, registerUser, validateToken } from "../controllers/auth.js";
import { validateAccessToken } from "../util/middleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/validate-token", validateAccessToken, validateToken);

export default router;
