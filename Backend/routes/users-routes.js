import express from 'express';
import { registerUser, loginUser, getMe, updateProfile, logoutUser } from '../controllers/users-controller.js';
import checkAuth from '../middlewares/check-auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.use(checkAuth);

router.get('/me', getMe);

router.put('/profile', updateProfile);

router.post('/logout', logoutUser);

export default router;
