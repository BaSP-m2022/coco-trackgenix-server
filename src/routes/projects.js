import express from 'express';
import projects from '../controllers/projects';

const router = express.Router();

router
  .get('/:id', projects.getProjectById)
  .delete('/:id', projects.deleteProject)
  .put('/:id', projects.updateProject);
export default router;
