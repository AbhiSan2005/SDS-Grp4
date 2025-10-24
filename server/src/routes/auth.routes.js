import express from 'express';
import { loginAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/auth/login
// Handles login attempts for Admin and Faculty Advisor roles
router.post('/login', loginAdmin);

export default router;