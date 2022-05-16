import projectSchema from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await projectSchema.find({});
    return res.status(200).json(allProjects);
  } catch (err) {
    return res.status(500).json({
      msg: 'there was an error',
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await projectSchema.create({
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
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'an error has occured',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllProjects,
  createProject,
};
