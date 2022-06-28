import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';
import authValidation from '../validations/auth';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin)
  .post('/', authValidation, adminsValidation.validateAdminCreation, adminsController.createAdmin)
  .put('/:id', adminsValidation.validateUpdate, adminsController.updateAdmin);

export default router;
