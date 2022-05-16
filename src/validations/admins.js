import Joi from 'joi';

const validateAdminCreation = (req, res, next) => {
  const adminPropSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(20),
    active: Joi.boolean(),
  });
  const validation = adminPropSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      error: validation.error.details[0].message,
    });
  }
  return next();
};

export default { validateAdminCreation };
