import express from 'express';
import timesheetsController from '../controllers/time-sheets';
// import timesheetsValidation from '../validations/time-sheets';

const router = express.Router();

router
  .delete('/:id', timesheetsController.deleteTimesheet)
  .post('/', timesheetsController.createTimesheet);
//   .put('/', timesheetsController.putTimesheet)
//   .get('/timesheets', timesheetsController.getTimesheets);

export default router;
