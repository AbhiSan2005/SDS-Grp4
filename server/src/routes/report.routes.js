import express from 'express';
import { getAllReports, getReport, createReport, updateReport, deleteReport, downloadReport } from '../controllers/report.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo, adminOnly } from '../middleware/role.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes accessible by both admin and faculty
router.get('/', restrictTo('admin', 'faculty'), getAllReports);
router.get('/:id', restrictTo('admin', 'faculty'), getReport);
router.get('/:id/download', restrictTo('admin', 'faculty'), downloadReport);

// Admin only routes (file upload will be added later when needed)
router.post('/', adminOnly, createReport);
router.put('/:id', adminOnly, updateReport);
router.delete('/:id', adminOnly, deleteReport);

export default router;