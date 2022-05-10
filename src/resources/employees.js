import express from 'express';
import fs from 'fs';

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
router.get('/id/:id', (req, res) => {
  const employee = employees.filter((user) => user.id === parseInt(req.params.id, 10));
  if (employee.length === 0) {
    res.status(404).json({ msg: `Member with id ${req.params.id} not found` });
  } else {
    res.json({ employee });
  }
});

// filter list of employees (missing filter for partial match)
router.get('/filter', (req, res) => {
  const filters = {
    name: req.query.name,
    lastName: req.query.lastName,
    active: req.query.active,
  };
  const { name = '', lastName = '', active = '' } = filters;
  let filteredList = employees;

  if (name !== '') {
    // eslint-disable-next-line max-len
    filteredList = filteredList.filter((employee) => employee.first_name.toLowerCase() === name.toLowerCase());
  }
  if (lastName !== '') {
    // eslint-disable-next-line max-len
    filteredList = filteredList.filter((employee) => employee.last_name.toLowerCase() === lastName.toLowerCase());
  }
  if (active !== '') {
    // eslint-disable-next-line max-len
    filteredList = filteredList.filter((employee) => employee.active.toString() === active.toLowerCase());
  }
  res.json(filteredList);
});

// Create an employee (missing validation for existing information or wrong information)
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
    employees.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({ msg: 'Employee created', newEmployee });
      }
    });
  }
});

// Edit an employee (no validations for wrong information)
router.put('id/:id', (req, res) => {
  const editEmployee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  };
  const {
    first_name: firstName = '', last_name: lastName = '', phone = '', email = '', password = '',
  } = editEmployee;
  console.log('hello');
  if (employees.some((employee) => employee.id === parseInt(req.params.id, 10))) {
    const index = employees.findIndex((employee) => employee.id === parseInt(req.params.id, 10));
    if (firstName !== '') {
      employees[index].first_name = firstName;
    }
    if (lastName !== '') {
      employees[index].last_name = lastName;
    }
    if (phone !== '') {
      employees[index].phone = phone;
    }
    if (email !== '') {
      employees[index].email = email;
    }
    if (password !== '') {
      employees[index].password = password;
    }
    res.json({ msg: 'Employee updated' });
  } else {
    res.status(404).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

// Delete an employee
router.delete('/id/:id', (req, res) => {
  if (employees.some((employee) => employee.id === parseInt(req.params.id, 10))) {
    const deleted = employees.find((employee) => employee.id === parseInt(req.params.id, 10));
    const updatedList = employees.filter((employee) => employee.id !== parseInt(req.params.id, 10));
    fs.writeFile('src/data/employees.json', JSON.stringify(updatedList), (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({ msg: 'Employee Deleted', deleted });
      }
    });
  } else {
    res.status(404).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

export default router;
