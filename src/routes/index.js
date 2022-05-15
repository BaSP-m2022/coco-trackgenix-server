import express from 'express';
// Routes import
import projectsRouter from './projects';

const router = express.Router();

router.use('/projects', projectsRouter);
export default router;
