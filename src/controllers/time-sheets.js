import Timesheet from '../models/Time-sheets';
import Member from '../models/Members';
import Project from '../models/Projects';

const getByOne = async (req, res) => {
  try {
    const oneTimeSheet = await Timesheet.findById(req.params.id).populate({
      path: 'member',
      populate: {
        path: 'employee',
        select: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
        },
      },
    }).populate({
      path: 'projectId',
      populate: {
        path: 'pm',
        populate: {
          path: 'employee',
          select: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
          },
        },
      },
    });
    if (oneTimeSheet) {
      return res.status(200).json({
        message: 'Success! TimeSheet fetched.',
        data: oneTimeSheet,
        error: false,
      });
    }
    return res.status(404).json({
      message: `TimeSheets ${req.params.id} not found`,
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allTimeSheets = await Timesheet.find().populate({
      path: 'member',
      populate: {
        path: 'employee',
        select: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
        },
      },
    }).populate({
      path: 'projectId',
      populate: {
        path: 'pm',
        populate: {
          path: 'employee',
          select: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
          },
        },
      },
    });
    res.status(200).json({
      message: 'Success! TimeSheets fetched.',
      data: allTimeSheets,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'internal server error',
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
    res.status(200).json({
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
    const found = await Timesheet.findById(req.params.id);
    if (!found) {
      return res.status(404).json({
        message: 'Code 404: Timesheet not found',
        data: req.params.id,
        error: true,
      });
    }
    if (req.body.member) {
      const member = await Member.findById(req.body.member);
      if (!member) {
        return res.status(404).json({
          message: `member ${req.body.member} not found`,
          data: undefined,
          error: true,
        });
      }
    }
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (!project) {
        return res.status(404).json({
          message: `Project ${req.body.projectId} not found`,
          data: undefined,
          error: true,
        });
      }
    }
    const update = await Timesheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(201).json({
      message: 'Success! Timesheet updated',
      data: update,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an internal server error',
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
