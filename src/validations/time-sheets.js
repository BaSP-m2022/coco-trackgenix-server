import Joi from 'joi';

const validate = (req, res, next) => {
  const timesheetSchema = Joi.object({
    member: Joi.string().lowercase().required(),
    project: Joi.string().lowercase().required(),
    startDate: Joi.date().min(Date.now()),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    task: Joi.string().required(),
    workedHours: Joi.array(),
    approved: Joi.boolean().required(),
  });
  const validation = timesheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: `Code 400: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validate,
};
