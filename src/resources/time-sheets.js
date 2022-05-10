const express = require('express');
const fs = require('fs');
const dataTimeSheets = require('../data/time-sheets.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(dataTimeSheets);
});

router.delete('/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const filterTs = dataTimeSheets.filter((timeSheet) => timeSheet.id !== timeSheetId);
  if (dataTimeSheets.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(filterTs);
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const idFound = dataTimeSheets.some((tsMember) => tsMember.id === req.params.id);
  if (idFound) {
    const updTimeSheet = req.body;
    dataTimeSheets.forEach((member, i) => {
      if (member.id === req.params.id) {
        const updateTs = { ...member, ...updTimeSheet };
        dataTimeSheets[i] = updateTs;
        fs.writeFile('src/data/time-sheets.json', JSON.stringify(updateTs), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Updated correctly');
          }
        });
        res.json({ msg: 'Timesheet update', updateTs });
      }
    });
  } else {
    res.status(400).json({ msg: `No timesheet user with the id of ${req.params.id}` });
  }
});

module.exports = router;
