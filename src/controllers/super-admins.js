import superAdminModel from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const AllSuperAdmins = await superAdminModel.find({});
    return res.status(200).json(AllSuperAdmins);
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdmin = await superAdminModel.findById({ _id: req.params.id });
      return res.status(200).json(superAdmin);
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

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await superAdminModel.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'The admin has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The admin has been successfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await superAdminModel.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const resultSuperAdmin = await superAdmin.save();
    return res.status(201).json(resultSuperAdmin);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  deleteSuperAdmin,
  createSuperAdmin,
};
