import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, adminsController.getAllAdmins)
  .get('/:id', authValidation, adminsController.getAdminById)
  .delete('/:id', authValidation, adminsController.deleteAdmin)
  .post('/', authValidation, adminsValidation.validateAdminCreation, adminsController.createAdmin)
  .put('/:id', authValidation, adminsValidation.validateUpdate, adminsController.updateAdmin);

export default router;
