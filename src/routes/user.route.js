import UserController from '../controllers/user.controller.js';
import express from 'express';
const router = express.Router();

router.get('/me', UserController.getUserById);
router.put('/me', UserController.updateUser);
router.put('/me/password', UserController.updatePassword);
router.delete('/me', UserController.deleteUser);

export default router;

