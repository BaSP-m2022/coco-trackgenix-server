const express = require('express');
const fs = require('fs');
const dataTimeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/getAllTimeSheet', (req, res) => {
  res.send(dataTimeSheets);
});

router.delete('/deleteTimeSheet/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const filterTs = dataTimeSheets.filter((timeSheet) => timeSheet.id !== timeSheetId);
  if (dataTimeSheets.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Deleted correctly');
      }
    });
  }
});
module.exports = router;
