import express from 'express';
import taskValidation from '../validations/tasks';
import tasksController from '../controllers/tasks';

const router = express.Router();

router
  .get('/', tasksController.getTasks)
  .get('/:id', tasksController.getTaskById)
  .post('/', taskValidation.validateCreation, tasksController.createTask)
  .delete('/:id', tasksController.deleteTask)
  .put('/:id', taskValidation.validateUpdate, tasksController.updateTask);

router
  .get('/', tasksController.getTasks)
  .get('/:id', tasksController.getTaskById)
  .post('/', taskValidation.validateCreation, tasksController.createTask)
  .delete('/:id', tasksController.deleteTask)
  .put('/:id', taskValidation.validateUpdate, tasksController.updateTask);

export default router;
