import SuperAdminModel from '../models/Super-admins';
import Firebase from '../helper/firebase';

const getAllSuperAdmins = async (req, res) => {
  try {
    const AllSuperAdmins = await SuperAdminModel.find({});
    return res.status(200).json({
      message: 'Super-admin list displayed correctly',
      data: AllSuperAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error, impossible to get all Super-Admins',
      data: error,
      error: true,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const superAdmin = await SuperAdminModel.findById({ _id: req.params.id });
      return res.status(200).json({
        message: 'The super-admin has been found!',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'The super-admin with the ID has been not found.',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error, impossible to get Super-Admin by id',
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
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdminModel.findByIdAndDelete({
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
      message: 'There was an error, Super-Admin not deleted',
      data: error,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: 'SUPERADMIN',
    });
    const superAdmin = new SuperAdminModel({
      firebaseUid: newFirebaseUser.uid,
      email: req.body.email,
      password: req.body.password,
    });
    const SuperAdmin = await superAdmin.save();
    return res.status(201).json({
      message: 'Super-Admin has been created',
      data: SuperAdmin,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(500).json({
      message: 'There was an error, Super-Admin not created',
      data: error,
      error: true,
    });
  }
};

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Super-Admin has not been found',
        data: result,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super-Admin has been updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500)({
      message: 'There was an error, Super-Admin not updated',
      data: error,
      error: true,
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
