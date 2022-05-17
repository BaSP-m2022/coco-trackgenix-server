import express from 'express';
// Routes import
import projectsRouter from './projects';
import tasksRouter from './tasks';
import employeeRouter from './employees';
import superAdminsRoutes from './super-admins';
import adminsRoutes from './admins';
import timesheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/employees', employeeRouter)
  .use('/Superadmins', superAdminsRoutes)
  .use('/projects', projectsRouter)
  .use('/tasks', tasksRouter)
  .use('/admins', adminsRoutes)
  .use('/timesheets', timesheetsRouter);

export default router;
