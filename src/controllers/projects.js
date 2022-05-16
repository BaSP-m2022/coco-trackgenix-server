import projectSchema from '../models/Projects';

// const getAllProjects = async(req, res) => {
//   try {
//     const allProjects = await projectSchema.find({});
//     res.status(200).json(allProjects);
//   } catch (err) {
//       res.status(500).json({
//       msg: "there was an error"
//     });
//   }
// };

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

export default {
  getProjectById,
  deleteProject,
};
