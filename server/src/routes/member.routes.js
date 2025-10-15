import express from 'express';
import { getMembers, createMember, updateMember, deleteMember , getMemberbyId} from '../controllers/member.controller.js';

const router = express.Router();

router.get('/', getMembers);

router.post('/', createMember);

router.put('/:id', updateMember);

router.get('/:id', getMemberbyId);

router.delete('/:id', deleteMember);

export default router;