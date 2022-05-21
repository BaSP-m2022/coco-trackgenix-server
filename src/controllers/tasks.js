import Tasks from '../models/Tasks';

const getTasks = async (req, res) => {
  try {
    const list = await Tasks.find({});
    res.status(200).json({
      msg: 'code 200: List of tasks successfully fetched',
      data: list,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Code 500: There was an error',
      data: error,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findById({ _id: req.params.id });
    if (task) {
      res.status(200).json({
        msg: `Code 200: Task with id ${req.params.id} successfully fetched`,
        data: task,
        error: false,
      });
    }
  } catch (error) {
    if (error.value) { // the server recieved the data
      res.status(404).json({
        msg: `Code 404: Task with id ${req.params.id} not found`,
        data: undefined,
        error: false,
      });
    } else { // the server did not receieve the data
      res.status(500).json({
        msg: 'Code 500: There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = await Tasks.create({
      description: req.body.description.toLowerCase(),
      workedHours: req.body.workedHours,
      date: req.body.date,
    });
    res.status(201).json({
      msg: 'Code 201: Task successfully created',
      data: newTask,
      error: false,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        msg: `Code 400: ${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({
        msg: 'Code 500: There was an internal error',
        data: error,
        error: true,
      });
    }
  }
};

const deleteTask = async (req, res) => {
  try {
    const found = await Tasks.findById(req.params.id);
    await Tasks.deleteOne({ _id: req.params.id });
    res.status(204).json({
      msg: 'Code 204: Task successfully deleted',
      data: found,
      error: false,
    });
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        msg: `Code 404: Task with id ${req.params.id} not found`,
        data: undefined,
        error: false,
      });
    } else {
      res.status(500).json({
        msg: 'Code 500: There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const updateTask = async (req, res) => {
  try {
    const targetTask = await Tasks.findById(req.params.id);
    if (targetTask) {
      targetTask.description = req.body.description.toLowerCase();
      await targetTask.save();
      res.status(201).json({
        msg: 'Code 201: Task successfully updated',
        data: targetTask,
        error: false,
      });
    } else {
      res.status(404).json({
        msg: `Code 404: Task with id ${req.params.id} not found`,
        data: undefined,
        error: false,
      });
    }
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        msg: `Code 400: ${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({
        msg: 'Code 500: There was an internal error',
        data: error,
        error: true,
      });
    }
  }
};

export default {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
};
