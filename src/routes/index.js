import express from 'express';

// Routes import
import tasksRouter from './tasks';

const router = express.Router();

router
  .use('/tasks', tasksRouter);

export default router;
