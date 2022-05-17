import joi from 'joi';
import timesheetModel from '../models/Time-sheets';

const timesheetSchema = joi.object({
  description: joi.string().min(1).max(50).required(),
  date: joi.date(),
  task: joi.string().min(1).max(20).required(),
  validate: joi.boolean().valid(true),
  projectId: joi.optional(),
  employee: {
    name: joi.string().min(1).max(20).required(),
    role: joi.string().valid('QA', 'TL', 'PM', 'DEV').required(),
  },
});

const validateCreation = async (req, res, next) => {
  const validation = timesheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request.',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  const validateDuplicated = await timesheetModel.findOne({ description: req.body.description });
  if (validateDuplicated) {
    return res.status(400).json({
      msg: 'Timesheet already exists. Status code: 400',
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const updateValidation = timesheetSchema.validate(req.body);
  if (updateValidation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request.',
      data: undefined,
      error: updateValidation.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
