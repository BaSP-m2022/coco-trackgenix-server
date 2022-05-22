import joi from 'joi';

const validateCreation = (req, res, next) => {
  const timesheetSchema = joi.object({
    tasks: joi.array().items(joi.string().lowercase().regex(/^[0-9a-z]{24,24}$/)),
    employeeId: joi.string().lowercase().required().regex(/^[0-9a-z]{24,24}$/),
    projectId: joi.string().lowercase().required().regex(/^[0-9a-z]{24,24}$/),
    startDate: joi.date().min(Date.now()),
    endDate: joi.date().min(joi.ref('startDate')).required(),
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

const validateUpdate = (req, res, next) => {
  const timesheetSchema = joi.object({
    tasks: joi.array().items(joi.string().lowercase().regex(/^[0-9a-z]{24,24}$/)),
    employeeId: joi.string().lowercase().regex(/^[0-9a-z]{24,24}$/),
    projectId: joi.string().lowercase().regex(/^[0-9a-z]{24,24}$/),
    startDate: joi.date().min(Date.now()),
    endDate: joi.date().min(joi.ref('startDate')),
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
  validateCreation,
  validateUpdate,
};
