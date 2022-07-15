import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import timesheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timesheetsController.getAll)
  .get('/:id', timesheetsController.getByOne)
  .delete('/:id', timesheetsController.deleteTimesheet)
  .post('/', timesheetValidation.validate, timesheetsController.createTimesheet)
  .put('/:id', timesheetValidation.validate, timesheetsController.updateTimesheet);

export default router;
