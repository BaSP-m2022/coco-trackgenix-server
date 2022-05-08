const express = require('express');
const fs = require('fs');
const dataTimeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getTimeSheetById/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const tsheet = dataTimeSheets.find((tsheets) => tsheets.id === timeSheetId);
  if (tsheet) {
    res.send(tsheet);
  } else {
    res.send('Id not found');
  }
});

router.post('/addTimeSheet', (req, res) => {
  const tsData = req.body;
  dataTimeSheets.push(tsData);
  fs.writeFile('src/data/time-sheets.json', JSON.stringify(dataTimeSheets), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Created correctly');
    }
  });
});

module.exports = router;
