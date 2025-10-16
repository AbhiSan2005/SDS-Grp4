import express from 'express';
import { getFacultyDashboard, getFacultyReports, viewReport, getFacultyProjects, viewProject } from '../controllers/faculty.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication and faculty or admin role
router.use(protect, restrictTo('faculty', 'admin'));

// Dashboard
router.get('/dashboard', getFacultyDashboard);

// Reports
router.get('/reports', getFacultyReports);
router.get('/reports/:id', viewReport);

// Projects
router.get('/projects', getFacultyProjects);
router.get('/projects/:id', viewProject);

export default router;