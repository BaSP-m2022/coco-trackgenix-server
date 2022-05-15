import adminModel from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const AllAdmins = await adminModel.find({});
    return res.status(200).json(AllAdmins);
  } catch (error) {
    return res.status(500).json({
      msg: 'There was an error',
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await adminModel.findById({ _id: req.params.id });
      return res.status(200).json(admin);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id parameter',
      });
    }
    const result = await adminModel.findByIdAndDelete({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({
        msg: 'The admin has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The admin has been successfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  deleteAdmin,
};

// const express = require('express');
// const fs = require('fs');
// const admins = require('../data/admins.json');

// const router = express.Router();

// router.get('/:id', (req, res) => {
//   const admin = admins.find((data) => data.id === req.params.id);
//   if (admin) {
//     res.json(admin);
//   } else {
//     res.send('User not found');
//   }
// });

// router.post('/', (req, res) => {
//   const adminsData = req.body;
//   const found = admins.some((data) => data.id === req.params.id);
//   if (found) {
//     res.send('This id already exists');
//   } else {
//     admins.push(adminsData);
//     fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//       if (err) {
//         res.status(404).send(err);
//       } else {
//         res.status(200).json(adminsData);
//       }
//     });
//   }
// });

// router.delete('/:id', (req, res) => {
//   const adminsId = req.params.id;
//   const filterTs = admins.filter((admin) => admin.id !== adminsId);
//   if (admins.length === filterTs.length) {
//     res.send('Could not delete because the time sheet was not found');
//   } else {
//     fs.writeFile('src/data/admins.json', JSON.stringify(filterTs), (err) => {
//       if (err) {
//         res.status(404).send(err);
//       } else {
//         res.send(filterTs);
//       }
//     });
//   }
// });

// router.put('/:id', (req, res) => {
//   const idFound = admins.some((tsAdmin) => tsAdmin.id === req.params.id);
//   if (idFound) {
//     const updAdmin = req.body;
//     admins.forEach((member, i) => {
//       if (member.id === req.params.id) {
//         const tsUpdate = { ...member, ...updAdmin };
//         admins[i] = tsUpdate;
//         fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
//           if (err) {
//             res.send(err);
//           } else {
//             res.send('Updated correctly');
//           }
//         });
//         res.json({ msg: 'Admin update', tsUpdate });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No admin with the id of ${req.params.id}` });
//   }
// });

// module.exports = router;
