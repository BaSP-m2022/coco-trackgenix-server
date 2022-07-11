import ProjectSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectSchema.find({}).populate('pm', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
    }).populate('members');
    if (!allProjects) {
      return res.status(404).json({
        message: 'None projects found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Projects list displayed correctly',
      data: allProjects,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'There was an error while trying to display the list of projects',
      data: err,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await ProjectSchema.findById({ _id: req.params.id }).populate('pm', {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
    }).populate({ path: 'members', populate: { path: 'members' } });
    if (!project) {
      return res.status(404).json({
        message: `The project with ID:'${req.params.id}' has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The project has been found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error while trying to display a project by Id',
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
      members: req.body.members,
      pm: req.body.pm,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'The project has been created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has ocurred',
      data: error,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const result = await ProjectSchema.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        message: `The project with ID:'${req.params.id}' has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The project with ID:'${req.params.id}' has been deleted successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const result = await ProjectSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `The project with ID:'${req.params.id}' has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: `The project with ID:'${req.params.id}' has been updated successfully`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has ocurred',
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
