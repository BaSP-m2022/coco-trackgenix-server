import express from 'express';
import adminsController from '../controllers/admins';
// import adminsValidation from '../validations/admins';

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin);

export default router;

// const mongoose = require('mongoose');
// const Admin = require('../models/Admins');

// mongoose.connect();

// import express from 'express';
// import adminsController from '../controllers/admins';
// import adminsValidation from '../validations/admins';

// const router = express.Router();

// router
//     .get('/',adminsController.getAllAdmins)
//     .post('/', adminsValidation.validateAdminCreation, adminsController.createAdmin)
//     .get('/:id', adminsController.getAdminById)
//     .put('/:id', adminsController.updateAdmin)
//     .delete('/:id', adminsController.deleteAdmin)

// export default router;

// const mongoose = require('mongoose');

// mongoose.connect(mongoDBURL);
