import Employee from '../models/Employees';
import Firebase from '../helper/firebase';

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json({
      message: 'Employees list displayed correctly.',
      data: allEmployees,
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

const getEmployeeById = async (req, res) => {
  const oneEmployee = await Employee.findById(req.params.id);
  try {
    if (oneEmployee) {
      res.status(200).json({
        message: `The employee with the ID:'${req.params.id}' has been found.`,
        data: oneEmployee,
        error: false,
      });
    }
    if (!oneEmployee) {
      res.status(404).json({
        message: `Employee with ID:'${req.params.id}' not found.`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: 'There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const addNewEmployee = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;

    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });

    const employeeCreated = new Employee({
      firebaseUid: newFirebaseUser.uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    const employee = await employeeCreated.save();
    return res.status(200).json({
      message: 'A new employee has been added successfully.',
      data: employee,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.auth().deleteUser(firebaseUid);
    }
    return res.json({
      message: 'There was an error',
      data: error,
      error: true,
    });
  }
};

const modifyEmployee = async (req, res) => {
  try {
    const update = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: `The employee (ID:'${req.params.id}') data has been updated correctly.`,
      data: update,
      error: false,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: 'There was an error',
        data: error,
        error: true,
      });
    }
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const del = await Employee.findByIdAndDelete(req.params.id);
    if (del) {
      res.status(200).json({
        message: `Employee with ID:'${req.params.id}' was deleted succesfully`,
        data: del,
        error: false,
      });
    }
    if (!del) {
      res.status(404).json({
        message: `Employee with ID:'${req.params.id}' not found`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        message: 'There was an error',
        data: error,
        error: true,
      });
    }
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
  modifyEmployee,
  deleteEmployee,
};
