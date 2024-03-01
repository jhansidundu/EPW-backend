import express from "express";
import {
  login,
  registerUser,
  validateToken,
  verifyEmail,
} from "../controllers/auth.js";
import { validateAccessToken } from "../util/middleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/validate-token", validateAccessToken, validateToken);
router.get("/verify/email/:email", verifyEmail);
export default router;
