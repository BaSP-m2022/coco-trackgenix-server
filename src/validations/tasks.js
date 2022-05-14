import Task from '../models/Tasks';

const validateCreation = async (req, res, next) => {
  const found = await Task.find({ description: req.body.description.toLowerCase().trim() });
  if (found) {
    return res.status(400).json({
      msg: 'This task already exists',
      data: found,
      error: true,
    });
  }
  return next();
};

const validateUpdate = async (req, res, next) => {
  const found = await Task.find({ description: req.body.description.toLowerCase().trim() });
  if (!found) {
    return res.status(400).json({
      msg: 'This task do not exists',
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
