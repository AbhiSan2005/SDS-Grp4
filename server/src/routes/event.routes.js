import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/event.controller.js';
import upload from '../middleware/multer.middleware.js';
import  { protect } from '../middleware/auth.middleware.js';
import { adminOnly, adminOrFacultyOnly } from '../middleware/role.middleware.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, adminOnly, upload.single('eventImage'), createEvent);
router.put('/:id', protect, adminOnly, upload.single('eventImage'), updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;