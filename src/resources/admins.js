const express = require('express');

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

module.exports = router;
