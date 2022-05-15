import express from 'express';

// Routes import
import tasksRouter from './tasks';
import adminsRoutes from './admins';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/admins', adminsRoutes);

export default router;
