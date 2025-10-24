import express from 'express';
import { getFacultyDashboard, getFacultyReports, viewReport, getFacultyProjects, viewProject } from '../controllers/faculty.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOrFacultyOnly, facultyOnly } from '../middleware/role.middleware.js';


const router = express.Router();
router.get('/dashboard', getFacultyDashboard);

// Reports
router.get('/reports', getFacultyReports);
router.get('/reports/:id', viewReport);

// Projects
router.get('/projects', getFacultyProjects);
router.get('/projects/:id', viewProject);

export default router;