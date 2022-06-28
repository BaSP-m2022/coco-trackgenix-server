import express from 'express';
import tasksRouter from './tasks';
import projectsRouter from './projects';
import employeeRouter from './employees';
import superAdminsRoutes from './super-admins';
import adminsRoutes from './admins';
import timesheetsRouter from './time-sheets';
import membersRouter from './members';
import authRouter from './auth';

const router = express.Router();
router
  .use('/tasks', tasksRouter)
  .use('/projects', projectsRouter)
  .use('/employees', employeeRouter)
  .use('/Superadmins', superAdminsRoutes)
  .use('/admins', adminsRoutes)
  .use('/timesheets', timesheetsRouter)
  .use('/members', membersRouter)
  .use('/register', authRouter);

export default router;
