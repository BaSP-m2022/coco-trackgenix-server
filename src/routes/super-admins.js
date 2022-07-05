import express from 'express';
import superAdminsController from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, superAdminsController.getAllSuperAdmins)
  .get('/:id', authValidation, superAdminsController.getSuperAdminById)
  .delete('/:id', authValidation, superAdminsController.deleteSuperAdmin)
  .post(
    '/',
    authValidation,
    superAdminsValidation.validateSuperAdminCreation,
    superAdminsController.createSuperAdmin,
  )
  .put(
    '/:id',
    authValidation,
    superAdminsValidation.validateSuperAdminUpdate,
    superAdminsController.updateSuperAdmin,
  );

export default router;
