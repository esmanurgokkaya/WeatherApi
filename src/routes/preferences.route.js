import express from 'express';
const router = express.Router();
import { authenticate } from '../middlewares/auth.middleware.js';
import PreferencesController from '../controllers/preferences.controller.js';

router.put('/units', authenticate, PreferencesController.putUnits);
router.put('/notifications', authenticate, PreferencesController.putNotifications);

export default router;