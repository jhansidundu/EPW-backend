import express from "express";
import { authentication } from "../controllers/authentication.js";
import { EnrollUsers } from "../controllers/enrollUsers.js";
const router = express.Router();
router.post("/enrollUsers", authentication, EnrollUsers);
export default router;
