import express from 'express';
// Routes import
import tasksRouter from './tasks';
import projectsRouter from './projects';

const router = express.Router();
router
  .use('/tasks', tasksRouter)
  .use('/projects', projectsRouter);
export default router;
