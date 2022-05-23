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
      data: undefined,
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  const oneEmployee = await Employee.findById(req.params.id);
  try {
    if (oneEmployee) {
      res.status(200).json({
        msg: 'Status 200',
        data: oneEmployee,
        error: false,
      });
    } if (!oneEmployee) {
      res.status(404).json({
        msg: 'Status 404: Employee not found with id',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        msg: 'Status 500: internal server error',
        data: undefined,
        error: true,
      });
    }
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
      msg: 'Status 201',
      data: Rta,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'Status 400: internal server error',
      data: undefined,
      error: true,
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
    res.status(200).json({
      msg: 'Status 200',
      data: update,
      error: false,
    });
  } catch (error) {
    if (error) {
      res.status(500).json({
        msg: 'Status 500: internal server error',
        data: undefined,
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
        msg: `Status 200: employee with ${req.params.id} id was deleted`,
        data: undefined,
        error: false,
      });
    } if (!del) {
      res.status(404).json({
        msg: 'Status 404: Employee not found',
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        msg: 'Status 500: internal server error',
        data: undefined,
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
