import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeePropSchema = Joi.object({
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
    rate: Joi.string().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(130).required(),
    starDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    clientName: Joi.string().min(1).max(50).required(),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeePropSchema),
    admins: Joi.string().min(1).max(50).required(),
  });
  const validate = projectValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of request',
      error: validate.error.details[0].message,
    });
  }
  return next();
};

export default { validateCreation };
