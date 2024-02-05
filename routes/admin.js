import express from "express";
import { addTeachers } from "../controllers/admin.js";
import { deleteTeachers } from "../controllers/admin.js";
import { authentication } from "../controllers/authentication.js";
import { addAdmin } from "../controllers/admin.js";
const router = express.Router();
router.post("/addTeacher", authentication, addTeachers);
router.post("/deleteTeacher", authentication, deleteTeachers);
router.post("/addAdmin", authentication, addAdmin);

export default router;
