import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json({
      msg: 'status 200',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Status 500: internal server error',
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const oneEmployee = await Employee.findById(req.params.id);
    return res.status(200).json({
      msg: 'Status 200',
      data: oneEmployee,
      error: false,
    });
  } catch (error) {
    if (error) {
      return res.status(404).json({
        msg: `Status 404: employee not found with id ${req.params.id} `,
      });
    }
    return res.status(500).json({
      msg: 'Status 500: internal server error',
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
    return res.status(201).json({
      msg: 'Status 200',
      data: Rta,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Status 500: internal server error',
    });
  }
};

const modifyEmployee = async (req, res) => {
  try {
    const update = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(200).json({
      msg: 'Status 200',
      data: update,
      error: false,
    });
  } catch (error) {
    if (error) {
      return res.status(404).json({
        msg: `Status 404: employee not found with ${req.params.id} id`,
      });
    }
    return res.status(500).json({
      msg: 'Status 500: internal server error',
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      msg: `Status 200: employee with ${req.params.id} id was deleted`,
    });
  } catch (error) {
    if (error) {
      return res.status(404).json({
        msg: 'Status 404: Employee not found',
      });
    }
    return res.status(500).json({
      msg: 'Status 500: internal server error',
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
