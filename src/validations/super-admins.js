import Joi from 'joi';
import superAdminsModel from '../models/Super-admins';

const validateSuperAdminCreation = async (req, res, next) => {
  const superAdminPropSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
      .min(4)
      .max(20)
      .required()
      .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/),
  });
  const validation = superAdminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during the request validation',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }
  const repeatedEmail = await superAdminsModel.findOne({
    email: req.body.email,
  });
  if (repeatedEmail) {
    res.status(400).json({
      message: 'This email already exists',
      data: repeatedEmail,
      error: true,
    });
  }
  return next();
};

const validateSuperAdminUpdate = async (req, res, next) => {
  const SuperAdminPropSchema = Joi.object({
    email: Joi.string().email().lowercase(),
    password: Joi.string()
      .min(4)
      .max(20)
      .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/),
  });
  const validation = SuperAdminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during the request validation',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateSuperAdminCreation,
  validateSuperAdminUpdate,
};
