import express from 'express';
import timesheetsController from '../controllers/time-sheet';
import timesheetsValidation from '../validations/time-sheets';
const router = express.Router();

router
    .get('/:id', timesheetsController.getByOne)
    .get('/', timesheetsController.getAll)
    // .put('/', timesheetsValidation.validateUpdate, timesheetsController.update)

export default router;
