const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

router.get('/admins', (req, res) => {
  res.send(admins);
});

router.get('/:id', (req, res) => {
//   const adminsID = req.params.id;
  const found = admins.find((data) => data.id === req.params.id);
  if (found) {
    res.send(found);
  } else {
    res.send('User not found');
  }
});

router.post('/', (req, res) => {
  const adminsData = req.body;
  admins.push(adminsData);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).json(adminsData);
    }
  });
});

router.delete('/:id', (req, res) => {
  const adminsId = req.params.id;
  const filterTs = admins.filter((admin) => admin.id !== adminsId);
  if (admins.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(filterTs);
      }
    });
  }
});

module.exports = router;
