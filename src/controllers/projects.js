import ProjectSchema from '../models/Projects';

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await ProjectSchema.findById({ _id: req.params.id });
      return res.status(200).json({
        msg: 'found',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'there was an error',
      data: error,
      error: true,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectSchema.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'the projects has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'the project has been susccessfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'an error has ocurred',
      data: undefined,
      error: true,
    });
  }
};
const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'the project jas not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has ocurred',
      data: error.details[0].message,
      error: true,
    });
  }
};
export default {
  getProjectById,
  deleteProject,
  updateProject,
};
