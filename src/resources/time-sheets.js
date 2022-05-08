const express = require('express');
const dataTimeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(dataTimeSheets);
});

module.exports = router;
