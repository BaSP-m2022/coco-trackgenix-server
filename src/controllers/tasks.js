import Tasks from '../models/Tasks';

const getTasks = async (req, res) => {
  try {
    const list = await Tasks.find({});
    res.status(200).json({
      msg: 'List of tasks successfully fetched',
      data: list,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.find({ _id: req.params.id });
    if (task) {
      res.status(200).json({
        msg: `Task with id ${req.params.id} successfully fetched`,
        data: task,
        error: false,
      });
    }
    res.status(404).json({
      msg: `Task with id ${req.params.id} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

// const createTask = async (req, res) => {
//   try {
//     if (task) {
//       res.status(200).json({
//         msg: `Task with id ${req.params.id} successfully fetched`,
//         data: task,
//         error: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: 'There was an error',
//       data: error,
//       error: true,
//     });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const task = await Tasks.find({ _id: req.params.id });
//     if (task) {
//       res.status(200).json({
//         msg: `Task with id ${req.params.id} successfully fetched`,
//         data: task,
//         error: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: 'There was an error',
//       data: error,
//       error: true,
//     });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     const task = await Tasks.find({ _id: req.params.id });
//     if (task) {
//       res.status(200).json({
//         msg: `Task with id ${req.params.id} successfully fetched`,
//         data: task,
//         error: false,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: 'There was an error',
//       data: error,
//       error: true,
//     });
//   }
// };

export default {
  getTasks,
  getTaskById,
  // createTask,
  // deleteTask,
  // updateTask,
};
