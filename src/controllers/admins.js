import AdminModel from '../models/Admins';
import Firebase from '../helper/firebase';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find({});
    res.status(200).json({
      message: 'Admin list displayed correctly.',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById({ _id: req.params.id });
    if (!admin) {
      res.status(404).json({
        message: `Admin with ID:'${req.params.id}' could not be found`,
        data: undefined,
        error: true,
      });
    } else {
      res.status(200).json({
        message: `The admin with the ID:'${req.params.id}' has been found.`,
        data: admin,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await AdminModel.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      res.status(404).json({
        message: `The admin ID:'${req.params.id}' could not be found`,
        data: undefined,
        error: true,
      });
    } else {
      await Firebase.auth().deleteUser(req.headers.uid);
      res.status(200).json({
        message: `The admin ID:'${req.params.id}' has been successfully deleted`,
        data: result,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      role: 'ADMIN',
    });
    const adminCreated = new AdminModel({
      firebaseUid: newFirebaseUser.uid,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const admin = await adminCreated.save();
    return res.status(201).json({
      message: 'Admin has been successfully created',
      data: admin,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.status(500).json({
      message: 'An error has occurred',
      data: error,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const focusAdmin = await AdminModel.findById({ _id: req.params.id });
    const result = await AdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!focusAdmin) {
      res.status(404).json({
        message: `Admin with ID:'${req.params.id}' could not be found`,
        data: undefined,
        error: true,
      });
    } else {
      res.status(200).json({
        message: 'Admin successfully updated',
        data: result,
        error: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'There was an error',
      data: error,
      error: true,
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
