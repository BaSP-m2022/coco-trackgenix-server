import express from 'express';
import projects from '../controllers/projects';

const router = express.Router();

router.get('/', projects.getAllProjects);

export default router;
