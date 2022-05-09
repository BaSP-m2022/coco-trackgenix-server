const express = require('express');

const router = express.Router();
const fs = require('fs');
const jsonProject = require('../data/projects.json');

// Delete a project
router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filterProj = jsonProject.filter((e) => e.id !== projectId);
  if (filterProj.length === jsonProject.length) {
    res.send('project not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filterProj), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('user deleted');
      }
    });
  }
});
// Add employee to DEV, QAS, TL, or PM
router.post('/:id', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        e.devs = upEmployee.devs ? upEmployee.devs : e.devs;
        e.qas = upEmployee.qas ? upEmployee.qas : e.qas;
        e.projectManager = upEmployee.projectManager ? upEmployee.projectManager : e.projectManager;
        e.techLeader = upEmployee.techLeader ? upEmployee.techLeader : e.techLeader;
        fs.writeFile('src/data/projects.json', JSON.stringify(upEmployee), (err) => {
          if (err) {
            res.send(err);
          } else {
            res.send('Employee added');
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `employee not found with the id of ${req.params.id}` });
  }
});
module.exports = router;
