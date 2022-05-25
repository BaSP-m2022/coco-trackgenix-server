import superAdminModel from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
  try {
    const AllSuperAdmins = await superAdminModel.find({});
    return res.status(200).json({
      msg: 'success',
      data: AllSuperAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
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
        msg: 'success',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
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
        msg: 'The Super-Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'The Super-Admin has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error could not delete Super-Admin',
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
      msg: 'a Super-Admin has been created',
      data: resultSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400);
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await superAdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Super-Admin has not been found',
      });
    }
    return res.status(200).json({
      msg: 'Super-Admin updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  deleteSuperAdmin,
  createSuperAdmin,
  updateSuperAdmin,
};
