import express from 'express';
import timesheetsController from '../controllers/time-sheets';
import timesheetsValidation from '../validations/time-sheets';

const router = express.Router();

router
  .delete('/:id', timesheetsController.deleteTimesheet)
  .post('/', timesheetsValidation.validateCreation, timesheetsController.postTimesheet)
  .put('/', timesheetsController.putTimesheet);

export default router;
