import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../controllers/project.controller.js";

import upload from "../middleware/multer.middleware.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly, adminOrFacultyOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/",  getProjects);
router.get("/:id", getProjectById);
router.post("/", protect, adminOnly, upload.single("image"), createProject);
router.put("/:id", protect, adminOnly, upload.single("image"), updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
