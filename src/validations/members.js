import Joi from 'joi';
import membersModel from '../models/Members';
import employeeModel from '../models/Employees';

const validateMember = async (req, res, next) => {
  const member = Joi.object({
    employee: Joi.string().min(10).max(30).required(),
    role: Joi.string()
      .valid('DEV', 'QA', 'PM')
      .required()
      .regex(/^[a-zA-Z]+$/),
    rate: Joi.number().required(),
  });
  const valid = member.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      error: valid.error.details[0].message,
      data: undefined,
    });
  }
  const memberExist = await membersModel.findOne({
    employee: req.body.employee,
  });
  if (memberExist) {
    return res.status(400).json({
      message: 'Member already exist',
    });
  }
  const employeeNot = await employeeModel.findOne({ _id: req.body.employee });
  if (!employeeNot) {
    return res.status(400).json({
      message: 'Employee does not exist',
      data: undefined,
      error: true,
    });
  }
  return next();
};
const validateMemberPut = async (req, res, next) => {
  const member = Joi.object({
    employee: Joi.string().min(10).max(30).required(),
    role: Joi.string()
      .valid('DEV', 'QA', 'PM')
      .regex(/^[a-zA-Z]+$/),
    rate: Joi.number().required(),
  });
  const valid = member.validate(req.body);
  if (valid.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      data: undefined,
      error: valid.error.details[0].message,
    });
  }
  const employeeNot = await employeeModel.findOne({ _id: req.body.employee });
  if (!employeeNot) {
    return res.status(400).json({
      message: 'Employee does not exist',
      data: undefined,
      error: true,
    });
  }
  return next();
};
export default {
  validateMember,
  validateMemberPut,
};
