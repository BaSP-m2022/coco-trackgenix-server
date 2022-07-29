import Tasks from '../models/Tasks';

const getTasks = async (req, res) => {
  try {
    const list = await Tasks.find({ ...req.query });
    res.status(200).json({
      message: 'List of tasks successfully fetched',
      data: list,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
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
        message: 'Task successfully fetched',
        data: task,
        error: false,
      });
    }
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    } else {
      res.status(500).json({
        message: 'There was an error',
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
    });
    res.status(201).json({
      message: 'Task successfully created',
      data: newTask,
      error: false,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        message: `${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({
        message: 'There was an internal error',
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
      message: 'Task has been successfully deleted',
      data: found,
      error: false,
    });
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    } else {
      res.status(500).json({
        message: 'There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const updateTask = async (req, res) => {
  try {
    const targetTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (targetTask) {
      targetTask.description = req.body.description.toLowerCase();
      res.status(201).json({
        message: 'Task successfully updated',
        data: targetTask,
        error: false,
      });
    } else {
      res.status(404).json({
        message: 'Task not found',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    if (error.message) {
      res.status(400).json({
        message: `${error.message}`,
        data: error,
        error: true,
      });
    } else {
      res.status(500).json({
        message: 'There was an internal error',
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
