import models from '../models/Time-sheets';

const deleteTimesheet = async (req, res) => {
  try {
    if (req.params.id) {
      const timesheet = await models.deleteOne({ _id: req.params.id });
      return res.status(204).json(timesheet);
    }
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error.',
    });
  }
  return null;
};

const createTimesheet = async (req, res) => {
  try {
    // eslint-disable-next-line new-cap
    const newTimesheet = await models.create({
      description: req.body.description,
      date: req.body.date,
      validate: req.body.validation,
      task: req.body.task,
      projectId: req.body.projectId,
      employee: req.body.employee,
    });
    const result = await newTimesheet.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred.',
      error: error.message,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id paramter.',
      });
    }
    const result = await models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'The timesheet has not been found.',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred.',
      error: error.message,
    });
  }
};

export default {
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
};
