import adminModel from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const AllAdmins = await adminModel.find({});
    res.status(200).json({
      msg: 'Status 200',
      data: AllAdmins,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await adminModel.findById({ _id: req.params.id });
    if (admin) {
      res.status(200).json({
        msg: 'Success',
        data: admin,
        error: false,
      });
    }
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        msg: 'Admin with that id could not be found',
        data: undefined,
        error: true,
      });
    } else {
      res.status(500).json({
        msg: 'There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await adminModel.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({
      msg: 'The admin has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    if (error.value) {
      res.status(404).json({
        msg: 'The admin could not be found',
        data: undefined,
        error: true,
      });
    } else {
      res.status(500).json({
        msg: 'There was an error',
        data: error,
        error: true,
      });
    }
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
    return res.status(201).json({
      msg: 'Admin has been successfully created',
      data: resultAdmin,
      error: false,
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details[0].message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const result = await adminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      msg: 'Admin successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    res.json({
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
