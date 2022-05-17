import projectSchema from '../models/Projects';
const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await projectSchema.findById({ _id: req.params.id });
      return res.status(200).json(project);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await projectSchema.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'the projects has not been found',
      });
    }
    return res.status(200).json({
      msg: 'the project has been susccessfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'an error has ocurred',
    });
  }
};
const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await projectSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'the project jas not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      error: error.details[0].message,
    });
  }
};
export default {
  getProjectById,
  deleteProject,
  updateProject,
};
