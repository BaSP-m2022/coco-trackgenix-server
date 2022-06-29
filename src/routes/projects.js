import express from 'express';
import projects from '../controllers/projects';
import projectValidation from '../validations/projects';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, projects.getAllProjects)
  .get('/:id', authValidation, projects.getProjectById)
  .post('/', projectValidation.validateCreation, authValidation, projects.createProject)
  .delete('/:id', authValidation, projects.deleteProject)
  .put('/:id', projectValidation.updateValidate, authValidation, projects.updateProject);

export default router;
