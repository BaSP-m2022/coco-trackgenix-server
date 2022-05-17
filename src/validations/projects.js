import Joi from 'joi';

const updateValidate = (req, res, next) => {
  const employeeSchema = Joi.object({
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
    rate: Joi.string().required(),
  });
  const Schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(130).required(),
    starDate: Joi.string().required(),
    endDate: Joi.string().optional(),
    clientName: Joi.string().min(3).max(50).required(),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeeSchema),
    admins: Joi.string().min(3).max(50).required(),
  });
  const validation = Schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      data: validation.error.details[0],
      error: true
    });
  }
  return next();
};

export default {
  updateValidate,
};
