import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', authValidation, adminsController.getAllAdmins)
  .get('/:id', authValidation, adminsValidation.idValidation, adminsController.getAdminById)
  .delete('/:id', authValidation, adminsValidation.idValidation, adminsController.deleteAdmin)
  .post('/', authValidation, adminsValidation.validateAdminCreation, adminsController.createAdmin)
  .put('/:id', authValidation, adminsValidation.idValidation, adminsValidation.validateUpdate, adminsController.updateAdmin);

export default router;
