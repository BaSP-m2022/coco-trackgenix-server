import Joi from 'joi';

const validateEmployee = (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/)
      .required(),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/)
      .required(),
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    active: Joi.boolean().required(),
  });
  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      error: validate.error.details[0].message,
    });
  }
  return next();
};

const validateMod = (req, res, next) => {
  const employee = Joi.object({
    firstName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/),
    lastName: Joi.string().min(3).max(30).regex(/^[a-zA-Z]+$/),
    phone: Joi.number(),
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30),
    active: Joi.boolean(),
  });
  const validate = employee.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      error: validate.error.details[0].message,
    });
  }
  return next();
};

export default {
  validateEmployee,
  validateMod,
};
