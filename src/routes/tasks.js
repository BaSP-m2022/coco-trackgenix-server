import express from 'express';
import taskValidation from '../validations/tasks';
import tasksController from '../controllers/tasks';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, tasksController.getTasks)
  .get('/:id', authValidation, tasksController.getTaskById)
  .post('/', taskValidation.validateCreation, authValidation, tasksController.createTask)
  .delete('/:id', authValidation, tasksController.deleteTask)
  .put('/:id', taskValidation.validateUpdate, authValidation, tasksController.updateTask);

export default router;
