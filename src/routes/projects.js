import express from 'express';
import projects from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/:id', projects.getProjectById)
  .delete('/:id', projects.deleteProject)
  .put('/:id', projectsValidation.updateValidate, projects.updateProject);

export default router;
