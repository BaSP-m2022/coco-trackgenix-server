import express from 'express';

// const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

// Body parser
router.use(express.json());

const generateId = () => {
  let count = 0;
  employees.forEach((employee) => {
    count += 1;
    if (count !== employee.id) {
      return count;
    }
    return count;
  });
  count += 1;
  return count;
};

// get 1 employee
router.get('/:id', (req, res) => {
  const employee = employees.filter((user) => user.id === parseInt(req.params.id, 10));
  if (employee.length === 0) {
    res.status(404).json({ msg: `Member with id ${req.params.id} not found` });
  } else {
    res.json({ employee });
  }
});

// Create an employee
router.post('/create-employee', (req, res) => {
  const errors = [];
  const newEmployee = {
    id: generateId(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    active: true,
  };
  const {
    first_name: firstName = '', last_name: lastName = '', phone = '', email = '', password = '',
  } = newEmployee;
  if (firstName === '' || lastName === '' || phone === '' || email === '' || password === '') {
    if (firstName === '') {
      errors.push({ msg: 'First Name is required' });
    }
    if (lastName === '') {
      errors.push({ msg: 'Last Name is required' });
    }
    if (phone === '') {
      errors.push({ msg: 'Phone is required' });
    }
    if (email === '') {
      errors.push({ msg: 'Email is required' });
    }
    if (password === '') {
      errors.push({ msg: 'Password is required' });
    }
    res.json(errors);
  } else {
    res.send(newEmployee);
  }
});

// filter list of employees
// router.get('/filter', (req, res) => {
//     const name = req.query.name;
//     const lastName = req.query.lastName;
//     const onlineStatus = req.query.onlineStatus;

// })

export default router;
