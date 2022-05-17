import express from 'express';
import projects from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projects.getAllProjects)
  .post('/', projectValidation.validateCreation, projects.createProject);

export default router;
