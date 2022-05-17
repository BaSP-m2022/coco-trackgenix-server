import express from 'express';

// Routes import
import timeSheetsRouter from './time-sheets';

const router = express.Router();

router
  .use('/timesheets', timeSheetsRouter);

export default router;
