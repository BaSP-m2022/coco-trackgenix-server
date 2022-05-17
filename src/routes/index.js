import express from 'express';

// Routes import
import tasksRouter from './tasks';
import employeeRouter from './employees';
import adminsRoutes from './admins';
import timesheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/tasks', tasksRouter)
  .use('/employees', employeeRouter)
  .use('/admins', adminsRoutes)
  .use('/timesheets', timesheetsRouter);

export default router;
