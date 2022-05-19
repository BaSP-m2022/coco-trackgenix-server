import express from 'express';
import projects from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projects.getAllProjects)
  .get('/:id', projects.getProjectById)
  .post('/', projectValidation.validateCreation, projects.createProject)
  .delete('/:id', projects.deleteProject)
  .put('/:id', projectValidation.updateValidate, projects.updateProject);

export default router;
