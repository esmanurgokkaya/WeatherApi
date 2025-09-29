import UserController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import express from 'express';
const router = express.Router();

router.get('/me', authenticate, UserController.getUserById);
router.put('/me', authenticate, UserController.updateUser);
router.put('/me/password', authenticate, UserController.updatePassword);
router.delete('/me', authenticate, UserController.deleteUser);

export default router;

