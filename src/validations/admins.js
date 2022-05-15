// import Joi from "joi";
// import adminsController from "../controllers/admins";
// const mongoose = require('mongoose');
// const Admin = require('../models/Admins');

// validateAdminCreation = (req, res, next) => {
//     const adminPropSchema = Joi.object({
//         name: Joi.string().required(),
//         lastName: Joi.string().required(),
//         email: Joi.string().email().lowercase().required(),
//         password: Joi.string().min(4).max(20)
//     });
//     const validation = validateAdminCreation.validate(req, body);
//     if(validation.error) {
//         return res.status(400).json({
//             msg: 'There was an error during the validation of the request',
//             error: validation.error.details[0].message,
//         })
//     }
//     return next();
// };
