import express from 'express';

// Routes import
import tasksRouter from './tasks';
import superAdminsRoutes from './super-admins';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/Superadmins', superAdminsRoutes);

export default router;
