import Joi from 'joi';
import membersModel from '../models/Members';
import employeeModel from '../models/Employees';

const validateMember = async (req, res, next) => {
  const member = Joi.object({
    employee: Joi.string().min(24).max(24).required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required().regex(/^[a-zA-Z]+$/),
    rate: Joi.number().required(),
  });
  const valid = member.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      error: valid.error.details[0].message,
    });
  }
  const employeeExist = await membersModel.findOne({ employee: req.body.employee });
  if (employeeExist) {
    return res.status(400).json({
      msg: 'Employee already exist',
    });
  }
  const employeeNot = await employeeModel.findOne({ _id: req.body.employee });
  if (!employeeNot) {
    return res.status(400).json({
      msg: 'Employee does not exist',
    });
  }
  return next();
};
const validateMemberPut = async (req, res, next) => {
  const member = Joi.object({
    employee: Joi.string().min(24).max(24),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').regex(/^[a-zA-Z]+$/),
    rate: Joi.number(),
  });
  const valid = member.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      error: valid.error.details[0].message,
    });
  }
  const employeeExist = await membersModel.findOne({ employee: req.body.employee });
  if (employeeExist) {
    return res.status(400).json({
      msg: 'Employee already exist',
    });
  }
  return next();
};
export default {
  validateMember,
  validateMemberPut,
};
