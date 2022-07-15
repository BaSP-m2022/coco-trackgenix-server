import express from 'express';
import projects from '../controllers/projects';
import projectValidation from '../validations/projects';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, projects.getAllProjects)
  .get('/:id', authValidation, projectValidation.idValidation, projects.getProjectById)
  .post('/', authValidation, projectValidation.idValidationPM, projectValidation.validateCreation, projects.createProject)
  .delete('/:id', authValidation, projectValidation.idValidation, projects.deleteProject)
  .put('/:id', authValidation, projectValidation.idValidationPM, projectValidation.idValidation, projectValidation.updateValidate, projects.updateProject);

export default router;
