import express from 'express';
import { getReports, uploadReport, generateAndSaveProjectReport ,generateAndSaveEventReport, deleteReport} from '../controllers/report.admin.controller.js';
import upload from '../middleware/multer.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly, adminOrFacultyOnly } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', protect, adminOrFacultyOnly, getReports);
router.delete('/:id', protect, adminOnly, deleteReport);
router.post('/upload', protect, adminOnly, upload.single('reportFile'), uploadReport);
router.post('/generate/project/:projectId', protect, adminOnly, generateAndSaveProjectReport);
router.post('/generate/event/:eventId', protect, adminOnly, generateAndSaveEventReport);

export default router;