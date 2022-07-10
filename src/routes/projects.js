import express from 'express';
import projects from '../controllers/projects';
import projectValidation from '../validations/projects';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, projects.getAllProjects)
  .get('/:id', authValidation, projects.getProjectById)
  .post('/', authValidation, projectValidation.validateCreation, projects.createProject)
  .delete('/:id', authValidation, projects.deleteProject)
  .put('/:id', authValidation, projectValidation.updateValidate, projects.updateProject);

export default router;
