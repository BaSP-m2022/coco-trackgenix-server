import Joi from 'joi';
import mongoose from 'mongoose';

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

const validateCreation = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    description: Joi.string().min(1).max(130).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    active: Joi.boolean().required(),
    members: Joi.array(),
    pm: Joi.string(),
  });
  const validate = projectValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of request',
      data: undefined,
      error: validate.error.details[0].message,
    });
  }
  return next();
};

const updateValidate = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(50)
      .regex(/^[a-zA-Z]+$/),
    description: Joi.string().min(10).max(130),
    startDate: Joi.string(),
    endDate: Joi.string().optional().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(50)
      .regex(/^[a-zA-Z]+$/),
    active: Joi.boolean(),
    members: Joi.array(),
    pm: Joi.string(),
  });
  const validation = Schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      data: validation.error.details[0],
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  updateValidate,
  idValidation,
};
