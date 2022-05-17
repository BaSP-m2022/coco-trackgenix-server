import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const employeePropSchema = Joi.object({
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
    rate: Joi.string().required(),
  });
  const projectValidation = Joi.object({
    name: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    description: Joi.string().min(1).max(130).required(),
    starDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    clientName: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
    active: Joi.boolean().required(),
    employees: Joi.array().items(employeePropSchema),
    admins: Joi.string().min(1).max(50).required()
      .regex(/^[a-zA-Z]+$/),
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
      error: true,
    });
  }
  return next();
};

export default { validateCreation, updateValidate };
