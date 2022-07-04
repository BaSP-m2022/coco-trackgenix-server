import AdminModel from '../models/Admins';
import Firebase from '../helper/firebase';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminModel.find({});
    res.status(200).json({
      msg: 'Status 200',
      data: allAdmins,
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
    const admin = await AdminModel.findById({ _id: req.params.id });
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
    const result = await AdminModel.findByIdAndDelete({ _id: req.params.id });
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
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const adminCreated = new AdminModel({
      firebaseUid: newFirebaseUser.uid,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const admin = await adminCreated.save();
    return res.status(201).json({
      msg: 'Admin has been successfully created',
      data: admin,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.json({
      msg: 'An error has occurred',
      message: error.toString(),
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const result = await AdminModel.findByIdAndUpdate(
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
    res.status(500).json({
      msg: 'There was an error',
      data: undefined,
      error,
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
