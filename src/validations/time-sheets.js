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

const validate = (req, res, next) => {
  const timesheetSchema = Joi.object({
    member: Joi.string().lowercase().required(),
    project: Joi.string().lowercase().required(),
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    task: Joi.string().required(),
    workedHours: Joi.array().max(7),
    approved: Joi.boolean().required(),
  });
  const validation = timesheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `Code 400: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validate,
  idValidation,
};
