import Joi from 'joi';
import AdminsModel from '../models/Admins';

const validateAdminCreation = async (req, res, next) => {
  const adminPropSchema = Joi.object({
    name: Joi.string().required().regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().required().regex(/^[a-zA-Z]+$/),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(20),
    active: Joi.boolean(),
  });
  const validation = adminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  const repeatedEmail = await AdminsModel.findOne({ email: req.body.email });
  if (repeatedEmail) {
    res.status(400).json({
      msg: 'This email already exists',
      data: repeatedEmail,
      error: true,
    });
  }
  return next();
};

const validateUpdate = async (req, res, next) => {
  const adminPropSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/),
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(4).max(20),
    active: Joi.boolean(),
  });
  const validation = adminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  const repeatedEmail = await AdminsModel.findOne({ email: req.body.email });
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
  validateAdminCreation,
  validateUpdate,
};
