import express from 'express';
import { signup, login, logout, getMe } from '../controllers/authController.js';
import { userAuth } from '../middlewears/userAuth.js';

const router = express.Router();

router.get('/me', userAuth, getMe);

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

export default router;