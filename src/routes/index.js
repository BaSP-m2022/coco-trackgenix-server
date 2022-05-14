import express from 'express';

// Routes import
import tasksRouter from './tasks';
import timesheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/timesheets', timesheetsRouter);
export default router;
