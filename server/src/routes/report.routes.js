import express from 'express';
import { getReports, uploadReport, generateAndSaveProjectReport ,generateAndSaveEventReport, deleteReport} from '../controllers/report.admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { restrictTo, adminOnly } from '../middleware/role.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// // All routes require authentication
// router.use(protect);

// // Routes accessible by both admin and faculty
// router.get('/', restrictTo('admin', 'faculty'), getAllReports);
// router.get('/:id', restrictTo('admin', 'faculty'), getReport);
// router.get('/:id/download', restrictTo('admin', 'faculty'), downloadReport);

// // Admin only routes (file upload will be added later when needed)
// router.post('/', adminOnly, createReport);
// router.put('/:id', adminOnly, updateReport);
// router.delete('/:id', adminOnly, deleteReport);

// testing 

router.get('/', getReports);
router.delete('/:id', deleteReport);
router.post('/upload', upload.single('reportFile'), uploadReport);
router.post('/generate/project/:projectId', generateAndSaveProjectReport);
router.post('/generate/event/:eventId', generateAndSaveEventReport);

export default router;