import TimesheetModel from '../models/Time-sheets';

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await TimesheetModel.find({ _id: req.params.id });
    if (oneTimeSheet) {
      res.status(200).json({
        message: 'TimeSheet fetched successfully',
        data: oneTimeSheet,
        error: false,
      });
    }
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        message: `TimeSheets with id ${req.params.id} not found`,
        data: undefined,
        error: false,
        status: 404,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        data: error,
        error: true,
        status: 500,
      });
    }
  }
};

const getAll = async (req, res) => {
  try {
    const allTimeSheets = await TimesheetModel.find({});
    res.status(200).json({
      message: 'TimeSheets fetched successfully',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There are no timeSheets',
      data: undefined,
      error: true,
      status: 500,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    const result = await TimesheetModel.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'Wrong id. Status code: 404',
        data: undefined,
        error: true,
      });
    }
    res.status(204).json({
      msg: 'Timesheet deleted. Status code: 204',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error. Status code: 500',
    });
  }
  return null;
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = await TimesheetModel.create({
      description: req.body.description,
      date: req.body.date,
      validate: req.body.validation,
      task: req.body.task,
      projectId: req.body.projectId,
      employee: req.body.employee,
    });
    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Timesheet created. Status code: 201',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There was an error. Status code: 400',
      data: error,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    const result = await TimesheetModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'The timesheet has not been found. Status code: 404',
        data: result,
        error: false,
      });
    }
    return res.status(200).json({
      msg: 'Timesheet updated. Status code: 200',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has occurred. Status code: 500',
      data: undefined,
      error: true,
    });
  }
};

export default {
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
  getByOne, 
  getAll,
};
