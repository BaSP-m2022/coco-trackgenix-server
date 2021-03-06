import joi from 'joi';
import Tasks from '../models/Tasks';

const validationSchema = joi.object({
  description: joi
    .string()
    .min(1)
    .max(90)
    .required()
    .regex(/^[0-:A-Za-z ",-.]{1,90}$/),
});

const validateCreation = async (req, res, next) => {
  const validation = validationSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Code 400: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  const found = await Tasks.findOne({ description: req.body.description.toLowerCase().trim() });
  if (found) {
    return res.status(400).json({
      message: 'Code 400: This task already exists',
      data: found,
      error: true,
    });
  }
  return next();
};

const validateUpdate = async (req, res, next) => {
  const validation = validationSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Code 400: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  const found = await Tasks.findOne({ _id: req.params.id });
  if (!found) {
    return res.status(400).json({
      message: 'Code 400: This task do not exist',
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
