import express from 'express';
import superAdminsController from '../controllers/super-admins';
import superAdminsValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminsController.getAllSuperAdmins)
  .get('/:id', superAdminsController.getSuperAdminById)
  .delete('/:id', superAdminsController.deleteSuperAdmin)
  .post('/', superAdminsValidation.validateSuperAdminCreation, superAdminsController.createSuperAdmin)
  .put('/:id', superAdminsController.updateSuperAdmin);

export default router;
