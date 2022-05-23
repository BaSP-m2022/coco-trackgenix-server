import ProjectSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectSchema.find({}).populate('employees', {
      role: 1,
      rate: 1,
    });
    return res.status(200).json({
      msg: 'success',
      data: allProjects,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'there was an error',
      data: err,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await ProjectSchema.findById({ _id: req.params.id }).populate('employees', {
        role: 1,
        rate: 1,
      });
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

const createProject = async (req, res) => {
  try {
    const project = await ProjectSchema.create({
      name: req.body.name,
      description: req.body.description,
      starDate: req.body.starDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      active: req.body.active,
      employees: req.body.employees,
      admins: req.body.admins,
    });
    const result = await project.save();
    return res.status(201).json({
      msg: 'success',
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
        msg: 'the project was not been found',
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
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
};
