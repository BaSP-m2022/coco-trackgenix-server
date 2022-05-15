import models from '../models/Time-sheets';

const deleteTimesheet = async (req, res) => {
  try {
    if (req.params.id) {
      const timesheet = await models.deleteOne({ _id: req.params.id });
      return res.status(200).json(timesheet);
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error.',
    });
  }
  return null;
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = await models.create({
      description: 'this is the description',
      date: new Date(),
      validate: true,
      task: 'this is the task',
      projectId: 'project id',
      employee: {
        name: 'Dayana Guerra',
        role: ['DEV', 'PM'],
      },
    });
    const result = await newTimesheet.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred.',
      error: error.details(0).message,
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
        msg: 'The project has not been found.',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred.',
      error: error.details(0).message,
    });
  }
};

export default {
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
};
