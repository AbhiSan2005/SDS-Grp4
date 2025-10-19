import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../controllers/project.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Public route - anyone can view projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected routes - Admin only

// router.post('/', protect, adminOnly, upload.single('image'), createProject);
// router.put('/:id', protect, adminOnly, upload.single('image'), updateProject);
// router.delete('/:id', protect, adminOnly, deleteProject);



// Testing

router.post("/", upload.single("image"), createProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
