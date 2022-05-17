import express from 'express';
// Routes import
import tasksRouter from './tasks';
import projectsRouter from './projects';
import timesheetsRouter from './time-sheets';

const router = express.Router();
router
  .use('/tasks', tasksRouter)
  .use('/projects', projectsRouter)
  .use('/timesheets', timesheetsRouter);

export default router;
