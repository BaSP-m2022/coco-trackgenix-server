import express from 'express';

// Routes import
import tasksRouter from './tasks';
import employeeRouter from './employees';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/employees', employeeRouter);

export default router;
