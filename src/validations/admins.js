import Joi from 'joi';
import mongoose from 'mongoose';
import AdminsModel from '../models/Admins';

const idValidation = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      message: `${req.params.id} is not a valid id`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateAdminCreation = async (req, res, next) => {
  const adminPropSchema = Joi.object({
    name: Joi.string().required().regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().required().regex(/^[a-zA-Z]+$/),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/).required(),
  });

  const validation = adminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during the validation of the request',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }

  const repeatedEmail = await AdminsModel.findOne({ email: req.body.email });
  if (repeatedEmail) {
    res.status(400).json({
      message: 'This email already exists',
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
    password: Joi.string().min(4).max(20).regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/),
  });

  const validation = adminPropSchema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      message: 'There was an error during the validation of the request',
      data: undefined,
      error: validation.error.details[0].message,
    });
  }

  return next();
};

export default {
  validateAdminCreation,
  validateUpdate,
  idValidation,
};
