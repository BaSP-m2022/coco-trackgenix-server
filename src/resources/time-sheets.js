const express = require('express');
const fs = require('fs');
const dataTimeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const tsheet = dataTimeSheets.find((tsheets) => tsheets.id === timeSheetId);
  if (tsheet) {
    res.send(tsheet);
  } else {
    res.send('Id not found');
  }
});

router.post('/', (req, res) => {
  const tsData = req.body;
  const dataId = req.body.id;
  const tsheets = dataTimeSheets.find((timesheetId) => timesheetId.id === dataId);
  if(tsheets){
      res.send("error: ID already exists")
  } else {
    dataTimeSheets.push(tsData);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(dataTimeSheets), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(201).json(tsData);
      }
    });
  }
});

module.exports = router;
