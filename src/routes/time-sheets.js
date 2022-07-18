import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import timesheetValidation from '../validations/time-sheets';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, timesheetsController.getAll)
  .get('/:id', authValidation, timesheetsController.getByOne)
  .delete('/:id', authValidation, timesheetsController.deleteTimesheet)
  .post('/', authValidation, timesheetValidation.validate, timesheetsController.createTimesheet)
  .put('/:id', authValidation, timesheetValidation.validate, timesheetsController.updateTimesheet);

export default router;
