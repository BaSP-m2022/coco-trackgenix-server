import joi from 'joi';
import Tasks from '../models/Tasks';

// Validation Schema
const validationSchema = joi.object({
  description: joi
    .string()
    .min(1)
    .max(120)
    .required()
    .regex(/[0-:A-Za-z ",-.]{1,120}/),
});

// Validations
const validateCreation = async (req, res, next) => {
  const validation = validationSchema.validate(req.body);
  const found = await Tasks.findOne({ description: req.body.description.toLowerCase().trim() });
  if (validation.error) {
    return res.status(400).json({
      msg: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  if (found) {
    return res.status(400).json({
      msg: 'This task already exists',
      data: found,
      error: true,
    });
  }
  return next();
};

const validateUpdate = async (req, res, next) => {
  const validation = validationSchema.validate(req.body);
  const found = await Tasks.find({ description: req.body.description.toLowerCase().trim() });
  if (validation.error) {
    return res.status(400).json({
      msg: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  if (!found) {
    return res.status(400).json({
      msg: 'This task do not exists',
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
