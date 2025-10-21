import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/event.controller.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', upload.single('eventImage'), createEvent);

router.put('/:id', upload.single('eventImage'), updateEvent);

router.delete('/:id', deleteEvent);

export default router;