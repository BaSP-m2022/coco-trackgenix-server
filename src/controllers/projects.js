import ProjectSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectSchema.find({}).populate('employees');
    return res.status(200).json({
      msg: 'Projects list displayed correctly',
      data: allProjects,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      msg: 'There was an error while trying to display the list of projects',
      data: err,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await ProjectSchema.findById({ _id: req.params.id }).populate('employees');
      return res.status(200).json({
        msg: 'The project has been found',
        data: project,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error while trying to display a project by Id',
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
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      active: req.body.active,
      employees: req.body.employees,
      admins: req.body.admins,
    });
    const result = await project.save();
    return res.status(201).json({
      msg: 'The project has been created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await ProjectSchema.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'The project has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The project has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
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
        msg: 'The project has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The project has been updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'An error has ocurred',
      data: error,
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
