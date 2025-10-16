import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/role.middleware.js';

const router = express.Router();

// Public route - anyone can view projects
router.get('/', getProjects);

// Protected routes - Admin only
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;