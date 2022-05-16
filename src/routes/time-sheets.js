import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import validateCreation from '../validations/time-sheets';

const router = express.Router();

router
  .delete('/:id', timesheetsController.deleteTimesheet)
  .post('/', validateCreation, timesheetsController.createTimesheet)
  .put('/:id', timesheetsController.updateTimesheet);

export default router;
