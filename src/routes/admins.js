import express from 'express';
import adminsController from '../controllers/admins';
// import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin)
  .post('/', adminsController.createAdmin)
  .put('/:id', adminsController.updateAdmin);

export default router;

//     .get('/',adminsController.getAllAdmins)
//     .post('/', adminsValidation.validateAdminCreation, adminsController.createAdmin)
//     .get('/:id', adminsController.getAdminById)
//     .put('/:id', adminsController.updateAdmin)
//     .delete('/:id', adminsController.deleteAdmin)
