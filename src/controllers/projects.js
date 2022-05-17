import ProjectSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await ProjectSchema.find({});
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
      msg: 'an error has occured',
      data: error.details[0].message,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  createProject,
};
