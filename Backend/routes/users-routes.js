import express from 'express';
import { registerUser, loginUser } from '../controllers/users-controller.js';

const router = express.Router();

router.post('/inscription', registerUser);

router.post('/connexion', loginUser);

export default router;
