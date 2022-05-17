import express from 'express';
import adminsController from '../controllers/admins';
import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin)
  .post('/', adminsValidation.validateAdminCreation, adminsController.createAdmin)
  .put('/:id', adminsValidation.validateUpdate, adminsController.updateAdmin);

export default router;
