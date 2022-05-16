import express from 'express';
import superAdminsController from '../controllers/super-admins';

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminById);

export default router;
