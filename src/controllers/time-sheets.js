/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import Timesheet from '../models/Time-sheets';
import Employee from '../models/Employees';
import Project from '../models/Projects';
import Task from '../models/Tasks';

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await Timesheet.findById(req.params.id).populate('tasks');
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
    const allTimeSheets = await Timesheet.find({});
    res.status(200).json({
      message: 'TimeSheets fetched successfully',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
      data: undefined,
      error: true,
      status: 500,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    const result = await Timesheet.findByIdAndDelete({ _id: req.params.id });
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
    // Check if there's an existing timesheet of that project for that employee
    const timesheetExists = await Timesheet.findOne({
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
    });
    if (timesheetExists) {
      return res.status(400).json({
        msg: 'Code 400: Timesheet already exists',
        data: timesheetExists,
        error: true,
      });
    }
    // Check that the ID's provided are valid
    const employee = await Employee.findById(req.body.employeeId);
    if (!employee) {
      return res.status(400).json({
        msg: `Code 400: No employee with the id ${req.body.employeeId}`,
        data: undefined,
        error: true,
      });
    }
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      return res.status(400).json({
        msg: `Code 400: No project with the id ${req.body.projectId}`,
        data: undefined,
        error: true,
      });
    }
    const taskIdChecker = req.body.tasks.forEach(async (task) => {
      const check = await Task.findById(task);
      if (!check) {
        return task;
      }
    });
    // eslint-disable-next-line no-console
    console.log(taskIdChecker);
    if (taskIdChecker !== undefined) {
      return res.status(400).json({
        msg: `Code 400: No tasks with the id ${taskIdChecker}`,
        data: undefined,
        error: true,
      });
    }
    // If pass all validations create timesheet
    const newTimesheet = await Timesheet.create({
      tasks: req.body.tasks,
      employeeId: req.body.employeeId,
      projectId: req.body.projectId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    await newTimesheet.save();
    return res.status(201).json({
      message: 'Code 201: Timesheet successfully created',
      data: newTimesheet,
      error: false,
    });
  } catch (error) {
    if (error.message) { // mongoose request error
      res.status(400).json({
        msg: `Code 400: ${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({ // internal error
        msg: 'Code 500: There was an internal error',
        data: error,
        error: true,
      });
    }
  }
};

const updateTimesheet = async (req, res) => {
  try {
    // check for matching timesheet for the id given
    const found = await Timesheet.findById(req.params.id);
    if (!found) {
      return res.status(404).json({
        msg: 'Code 404: Timesheet not found',
        data: req.params.id,
        error: true,
      });
    }
    // Check that the ID's provided are valid
    if (req.body.employeeId) {
      const employee = await Employee.findById(req.body.employeeId);
      if (!employee) {
        return res.status(400).json({
          msg: `Code 400: No employee with the id ${req.body.employeeId}`,
          data: undefined,
          error: true,
        });
      }
    }
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (!project) {
        return res.status(400).json({
          msg: `Code 400: No project with the id ${req.body.projectId}`,
          data: undefined,
          error: true,
        });
      }
    }
    if (req.body.tasks) {
      const taskIdChecker = req.body.tasks.forEach(async (task) => {
        const check = await Task.findById(task);
        if (!check) {
          return [undefined, task];
        }
      });
      if (taskIdChecker[0] === undefined) {
        return res.status(400).json({
          msg: `Code 400: No tasks with the id ${taskIdChecker[1]}`,
          data: undefined,
          error: true,
        });
      }
    }
    // validate that is not creating a duplicate
    if (req.body.employeeId) {
      const asssignedTimesheet = await Timesheet.findOne({
        employeeId: req.body.employeeId,
        projectId: found.projectId,
      });
      if (asssignedTimesheet) {
        return res.status(400).json({
          msg: 'Code 400: Timesheet already assigned to the employee',
          data: asssignedTimesheet,
          error: true,
        });
      }
    }
    if (req.body.tasks && req.body.tasks.length > 0) {
      const assignedTask = req.body.tasks.forEach((task) => {
        found.tasks.forEach((existingTask) => {
          if (task === existingTask) return existingTask;
        });
      });
      if (assignedTask) {
        return res.status(400).json({
          msg: 'Code 400: task already assigned',
          data: assignedTask,
          error: true,
        });
      }
    }
    // if everything passes check what is provided and update it
    if (req.body.tasks) found.tasks = [...found.tasks, ...req.body.tasks];
    if (req.body.employeeId) found.employeeId = req.body.employeeId;
    if (req.body.projectId) found.projectId = req.body.projectId;
    if (req.body.startDate) found.startDate = req.body.startDate;
    if (req.body.endDate) found.endDate = req.body.endDate;
    await found.save();
    res.status(201).json({
      msg: 'Code 201: Task successfully updated',
      data: found,
      error: false,
    });
  } catch (error) {
    if (error.message) { // mongoose request error
      res.status(400).json({
        msg: `Code 400: ${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({ // internal error
        msg: 'Code 500: There was an internal error',
        data: error,
        error: true,
      });
    }
  }
};

export default {
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
  getByOne,
  getAll,
};
