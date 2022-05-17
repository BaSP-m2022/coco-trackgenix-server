import express from 'express';
// Routes import
import projectsRouter from './projects';
import tasksRouter from './tasks';
import adminsRoutes from './admins';
import timesheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/projects', projectsRouter)
  .use('/tasks', tasksRouter)
  .use('/admins', adminsRoutes)
  .use('/timesheets', timesheetsRouter);

export default router;
