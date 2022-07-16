import Timesheet from '../models/Time-sheets';
import Employee from '../models/Employees';
import Member from '../models/Members';
import Project from '../models/Projects';

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await Timesheet.findById(req.params.id).populate('projectId', {
      _id: 1,
      name: 1,
      clientName: 1,
      admins: 1,
    }).populate('tasks', {
      _id: 1,
      description: 1,
      workedHours: 1,
      date: 1,
    }).populate('employeeId', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
    });
    if (oneTimeSheet) {
      return res.status(200).json({
        message: 'TimeSheet fetched successfully',
        data: oneTimeSheet,
        error: false,
      });
    }
    return res.status(404).json({
      message: `TimeSheets with id ${req.params.id} not found`,
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      data: error,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allTimeSheets = await Timesheet.find({}).populate('projectId', {
      _id: 1,
      name: 1,
      client: 1,
      admins: 1,
    }).populate('tasks', {
      _id: 1,
      description: 1,
      workedHours: 1,
      date: 1,
    }).populate('employeeId', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
    });
    res.status(200).json({
      message: 'TimeSheets fetched successfully',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error...',
      data: undefined,
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    const result = await Timesheet.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        message: 'Error! Timesheet not found.',
        data: undefined,
        error: true,
      });
    }
    res.status(204).json({
      message: 'Success! Timesheet deleted.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There where an internal server error.',
      data: undefined,
      error: true,
    });
  }
  return null;
};

const createTimesheet = async (req, res) => {
  try {
    // Check if there's an existing timesheet of that project for that employee
    const timesheetExists = await Timesheet.findOne({
      member: req.body.member,
      project: req.body.projectId,
    });
    if (timesheetExists) {
      return res.status(409).json({
        message: 'Conflict! Timesheet already exists.',
        data: timesheetExists,
        error: true,
      });
    }
    // Check that the ID's provided are valid
    const member = await Member.findById(req.body.member);
    if (!member) {
      return res.status(404).json({
        message: `Error! Member ${req.body.employeeId} not found.`,
        data: undefined,
        error: true,
      });
    }
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      return res.status(404).json({
        message: `Error! Project ${req.body.projectId} not found.`,
        data: undefined,
        error: true,
      });
    }
    // If pass all validations create timesheet
    const newTimesheet = await Timesheet.create({
      member: req.body.member,
      projectId: req.body.projectId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      task: req.body.task,
      workedHours: req.body.workedHours,
      approved: req.body.approved,
    });
    await newTimesheet.save();
    return res.status(201).json({
      message: 'Success! Timesheet created.',
      data: newTimesheet,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There were an internal error.',
      data: error,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    // check for matching timesheet for the id given
    const found = await Timesheet.findById(req.params.id);
    if (!found) {
      return res.status(404).json({
        message: 'Code 404: Timesheet not found',
        data: req.params.id,
        error: true,
      });
    }
    // Check that the ID's provided are valid
    if (req.body.employeeId) {
      const employee = await Employee.findById(req.body.employeeId);
      if (!employee) {
        return res.status(400).json({
          message: `Code 400: No employee with the id ${req.body.employeeId}`,
          data: undefined,
          error: true,
        });
      }
    }
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (!project) {
        return res.status(400).json({
          message: `Code 400: No project with the id ${req.body.projectId}`,
          data: undefined,
          error: true,
        });
      }
    }
    // validate that is not creating a duplicate
    // if (req.body.employeeId) {
    //   const asssignedTimesheet = await Timesheet.findOne({
    //     employeeId: req.body.employeeId,
    //     projectId: found.projectId,
    //   });
    //   if (asssignedTimesheet) {
    //     return res.status(400).json({
    //       message: 'Code 400: Timesheet already assigned to the employee',
    //       data: asssignedTimesheet,
    //       error: true,
    //     });
    //   }
    // }
    // if everything passes check what is provided and update it
    // if (req.body.tasks) found.tasks = found.tasks.concat(req.body.tasks);
    // if (req.body.employeeId) found.employeeId = req.body.employeeId;
    // if (req.body.projectId) found.projectId = req.body.projectId;
    // if (req.body.startDate) found.startDate = req.body.startDate;
    // if (req.body.endDate) found.endDate = req.body.endDate;
    // await found.save();
    const update = await Timesheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(201).json({
      message: 'Code 201: Timesheet successfully updated',
      data: update,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({ // internal error
      message: 'Code 500: There was an internal error',
      data: error,
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
