import joi from 'joi';

const validateCreation = (req, res, next) => {
  const timesheetSchema = joi.object({
    description: joi.string().min(1).max(50).required(),
    date: joi.date(),
    task: joi.string().min(1).max(20).required(),
    validate: joi.boolean().valid(true).required(),
    projectId: joi.optional(),
    employee: {
      name: joi.string().min(1).max(20).required(),
      role: joi.string().valid('QA', 'TL', 'PM', 'DEV').required(),
    },
  });
  const validation = timesheetSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request.',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default validateCreation;
