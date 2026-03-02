import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', authUser);
router.route('/me').get(protect, getUserProfile);

export default router;
