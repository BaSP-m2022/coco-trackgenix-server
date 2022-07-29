import Joi from 'joi';
import mongoose from 'mongoose';
import employeesModels from '../models/Employees';

const idValidation = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      message: `${req.params.id} is not a valid ID`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEmployee = async (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/)
      .required(),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/)
      .required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .required(),
    pm: Joi.boolean(),
  });

  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      data: undefined,
      error: validate.error.details[0].message,
    });
  }

  const emailExist = await employeesModels.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({
      message: 'Email already exist',
      data: emailExist,
      error: true,
    });
  }

  return next();
};

const validateMod = async (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/),
    phone: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30).regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/),
    pm: Joi.boolean(),
  });

  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: 'There was an error during the validation of the request',
      data: undefined,
      error: validate.error.details[0].message,
    });
  }

  return next();
};

export default {
  validateEmployee,
  validateMod,
  idValidation,
};
