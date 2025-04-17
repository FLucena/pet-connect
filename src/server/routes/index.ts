import { Router } from 'express';
import userRoutes from './users';
import petRoutes from './pets';

const router = Router();

// Import route files
// import authRoutes from './auth';

// Use routes
// router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pets', petRoutes);

export default router; 