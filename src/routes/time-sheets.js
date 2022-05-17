import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import timesheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .delete('/:id', timesheetsController.deleteTimesheet)
  .post('/', timesheetValidation.validateCreation, timesheetsController.createTimesheet)
  .put('/:id', timesheetValidation.validateUpdate, timesheetsController.updateTimesheet);

export default router;
