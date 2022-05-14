import express from 'express';
import tasksController from '../controllers/tasks';
import taskValidation from '../validations/tasks';

const router = express.Router;

router
  .get('/', tasksController.getTasks)
  .get('/:id', tasksController.getTaskById)
  .post('/', taskValidation.validateCreation, tasksController.createTask)
  .delete('/:id', tasksController.deleteTask)
  .put('/:id', taskValidation.validateUpdate, tasksController.updateTask);

export default router;
