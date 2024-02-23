import express from "express";
import { addTeacher, addAdmin } from "../controllers/admin.js";
import { validateAccessToken } from "../util/middleware.js";
const router = express.Router();
router.post("/teacher/add", validateAccessToken, addTeacher);
// router.post("/teacher/delete", authentication, deleteTeacher);
router.post("/add", validateAccessToken, addAdmin);

export default router;
