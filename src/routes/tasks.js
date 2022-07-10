import express from 'express';
import taskValidation from '../validations/tasks';
import tasksController from '../controllers/tasks';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, tasksController.getTasks)
  .get('/:id', authValidation, tasksController.getTaskById)
  .post('/', authValidation, taskValidation.validateCreation, tasksController.createTask)
  .delete('/:id', authValidation, tasksController.deleteTask)
  .put('/:id', authValidation, taskValidation.validateUpdate, tasksController.updateTask);

export default router;
