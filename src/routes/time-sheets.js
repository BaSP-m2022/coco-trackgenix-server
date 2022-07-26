import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import timesheetValidation from '../validations/time-sheets';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, timesheetsController.getAll)
  .get('/:id', authValidation, timesheetValidation.idValidation, timesheetsController.getByOne)
  .delete('/:id', authValidation, timesheetValidation.idValidation, timesheetsController.deleteTimesheet)
  .post('/', authValidation, timesheetValidation.validateAdd, timesheetsController.createTimesheet)
  .put('/:id', authValidation, timesheetValidation.idValidation, timesheetValidation.validateEdit, timesheetsController.updateTimesheet);

export default router;
