import superAdminModel from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const AllSuperAdmins = await superAdminModel.find({});
    return res.status(200).json({
      message: 'Super-admin list displayed correctly',
      data: AllSuperAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdmin = await superAdminModel.findById({ _id: req.params.id });
      return res.status(200).json({
        message: 'The super-admin has been found!',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'The super-admin with the ID has been found.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await superAdminModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!result) {
      return res.status(404).json({
        message: 'The Super-Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The Super-Admin has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error could not delete Super-Admin',
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
    return res.status(201).json({
      message: 'Super-Admin has been created',
      data: resultSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
      });
    }
    const result = await superAdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Super-Admin has not been found',
      });
    }
    return res.status(200).json({
      message: 'Super-Admin has been updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500);
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  deleteSuperAdmin,
  createSuperAdmin,
  updateSuperAdmin,
};
