const express = require('express');

const router = express.Router();
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const generateId = () => {
  let count = 0;
  superAdmins.forEach((superAdmin) => {
    count += 1;
    if (count !== superAdmin.id) {
      return count;
    }
    return count;
  });
  count += 1;
  return count;
};

router.post('/', (req, res) => {
  const newSuperAdmin = {
    id: generateId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    active: true,
  };
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
  } = newSuperAdmin;
  superAdmins.push(newSuperAdmin);
  if (firstName && lastName && phone && email && password) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          msg: 'Superadmin created successfully',
          created_superadmin: newSuperAdmin,
        });
      }
    });
  } else {
    res.json({ msg: 'Please, check your data is complete' });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

router.get('/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `No superAdmin with the id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    // eslint-disable-next-line max-len
    const newSuperAdmins = (superAdmins.filter((superAdmin) => superAdmin.id !== parseInt(req.params.id, 10)));
    // eslint-disable-next-line max-len
    const deletedSuperAdmin = (superAdmins.filter((superAdmin) => superAdmin.id === parseInt(req.params.id, 10)));
    fs.writeFile('src/data/super-admins.json', JSON.stringify(newSuperAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          msg: 'Deleted successfully',
          deleted_superadmin: deletedSuperAdmin,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No superAdmin with the id of ${req.params.id}` });
  }
});

router.put('/:id', (req, res) => {
  const found = superAdmins.some((superAdmin) => superAdmin.id === parseInt(req.params.id, 10));
  if (found) {
    const updatedSuperAdmin = {
      id: parseInt(req.params.id, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: true,
    };
    superAdmins.forEach((superAdmin, i) => {
      if (superAdmin.id === req.params.id) {
        superAdmins[i] = updatedSuperAdmin;
      }
    });

    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          msg: 'Updated successfully',
          updated_superadmin: updatedSuperAdmin,
        });
      }
    });
  }
});
module.exports = router;
