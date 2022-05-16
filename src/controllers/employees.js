import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json(allEmployees);
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const oneEmployee = await Employee.findById(req.params.id);
      return res.status(200).json(oneEmployee);
    }
    return res.status(404).json({
      msg: `Employee not found with ${req.params.id} id`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const addNewEmployee = async (req, res) => {
  try {
    const AddEmployee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const Rta = await AddEmployee.save();
    return res.status(201).json(Rta);
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const modifyEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'ID missing',
      });
    }
    const update = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!update) {
      return res.status(404).json({
        msg: `Employee not found with ${req.params.id} id`,
      });
    }
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const del = await Employee.findByIdAndDelete(req.params.id);
    if (!del) {
      return res.status(404).json({
        msg: 'Employee not found',
      });
    }
    return res.status(200).json({
      msg: `Employee with ${req.params.id} id was deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
  modifyEmployee,
  deleteEmployee,
};
