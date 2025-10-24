import express from 'express';
import { getMembers, createMember, updateMember, deleteMember , getMemberbyId} from '../controllers/member.controller.js';
import upload from '../middleware/multer.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly , adminOrFacultyOnly} from '../middleware/role.middleware.js';


const router = express.Router();

router.get('/', protect, adminOrFacultyOnly, getMembers);
router.get('/:id', protect, adminOrFacultyOnly, getMemberbyId);

router.post('/', protect, adminOnly, upload.single('photo'), createMember);
router.put('/:id', protect, adminOnly, upload.single('photo'), updateMember);
router.delete('/:id', protect, adminOnly, deleteMember);

export default router;