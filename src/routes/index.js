import express from 'express';

// Routes import
import tasksRouter from './tasks';
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/tasks', tasksRouter);

router
  .use('/timesheets', timeSheetsRouter);

export default router;
