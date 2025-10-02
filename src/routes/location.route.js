import LocationController from '../controllers/location.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import express from 'express';
const router = express.Router();

router.post('/', authenticate, LocationController.createLocation);
router.get('/:id', authenticate, LocationController.getLocationById);
router.get('/user/:user_id', authenticate, LocationController.getAllLocationsByUserId);
router.put('/:id', authenticate, LocationController.updateLocation);
router.delete('/:id', authenticate, LocationController.deleteLocation);

export default router;