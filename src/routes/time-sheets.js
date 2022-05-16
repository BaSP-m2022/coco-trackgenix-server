import express from 'express';
import timesheetsController from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/:id', timesheetsController.getByOne)
  .get('/', timesheetsController.getAll);

export default router;
