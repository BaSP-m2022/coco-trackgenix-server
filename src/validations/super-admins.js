import Joi from 'joi';
import superAdminsModel from '../models/Super-admins';

const validateSuperAdminCreation = (req, res, next) => {
  const superAdminPropSchema = Joi.object({
    name: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(20),
    active: Joi.boolean(),
  });
  const validation = superAdminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

const validateSuperAdminUpdate = async (req, res, next) => {
  const SuperAdminPropSchema = Joi.object({
    name: Joi.string().min(1).max(50).regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().min(1).max(50).regex(/^[a-zA-Z]+$/),
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(4).max(20),
    active: Joi.boolean(),
  });
  const validation = SuperAdminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  const repeatedEmail = await superAdminsModel.findOne({ email: req.body.email });
  if (repeatedEmail) {
    res.status(400).json({
      msg: 'This email already exists',
      data: repeatedEmail,
      error: true,
    });
  }
  return next();
};

export default {
  validateSuperAdminCreation,
  validateSuperAdminUpdate,
};
