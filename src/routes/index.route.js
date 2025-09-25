import  Router  from 'express';
import ok from '../utils/apiResponse.js';
import AuthRoutes from './auth.route.js';

const router = Router();
router.get('/health', (req, res) => {
  ok(res, {
    status: 'up',
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});


// auth routes
router.use('/auth', AuthRoutes)


export default router;
