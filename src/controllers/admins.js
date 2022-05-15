import adminModel from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const AllAdmins = await adminModel.find({});
    return res.status(200).json(AllAdmins);
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await adminModel.findById({ _id: req.params.id });
      return res.status(200).json(admin);
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

const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await adminModel.findByIdAndDelete({ _id: req.params.id });
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

const createAdmin = async (req, res) => {
  try {
    const admin = await adminModel.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const resultAdmin = await admin.save();
    return res.status(201).json(resultAdmin);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details[0].message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await adminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Admin has not been found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'There was an error',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  deleteAdmin,
  createAdmin,
  updateAdmin,
};
