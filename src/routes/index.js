import express from 'express';
// Routes import
import projectsRouter from './projects';
import tasksRouter from './tasks';
import timesheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/projects', projectsRouter)
  .use('/tasks', tasksRouter)
  .use('/timesheets', timesheetsRouter);
export default router;
