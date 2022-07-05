import superAdminModel from '../models/Super-admins';
import Firebase from '../helper/firebase';

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
    const superAdmin = superAdminModel.create({
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
    return res.json({
      msg: 'An error has ocurred',
      message: error.toString(),
    });
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
