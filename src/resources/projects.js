const express = require('express');

const router = express.Router();
const fs = require('fs');
const jsonProject = require('../data/projects.json');

// Delete a project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  const filterProj = jsonProject.filter((e) => e.id !== projectId);
  if (filterProj.length === jsonProject.length) {
    res.status(404).send('project not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filterProj), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send({ msg: 'Project deleted' }, filterProj);
      }
    });
  }
  res.send(filterProj);
});
// Add employee to DEV, QAS, TL, or PM (first employee)
router.put('/employee/:id/one', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        const firstE = e.employee[0];
        firstE.id = upEmployee.id ? upEmployee.id : e.id;
        firstE.role = upEmployee.role ? upEmployee.role : e.role;
        firstE.rate = upEmployee.rate ? upEmployee.rate : e.rate;
        fs.writeFile('src/data/projects.json', JSON.stringify(e), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(e);
          }res.status(200).send(e, { msg: 'Employee added' });
        });
      }
    });
  } else {
    res.status(404).json({ msg: `proyect not found with the id of ${req.params.id}` });
  }
});
// Add employee to DEV, QAS, TL, or PM (second employee)
router.put('/employee/:id/two', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        const secondE = e.employee[1];
        secondE.id = upEmployee.id ? upEmployee.id : e.id;
        secondE.role = upEmployee.role ? upEmployee.role : e.role;
        secondE.rate = upEmployee.rate ? upEmployee.rate : e.rate;
        fs.writeFile('src/data/projects.json', JSON.stringify(e), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(e);
          }res.status(200).send(e, { msg: 'Employee added' });
        });
      }
    });
  } else {
    res.status(404).json({ msg: `proyect not found with the id of ${req.params.id}` });
  }
});
// Add employee to DEV, QAS, TL, or PM (third employee)
router.put('/employee/:id/three', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        const thirdE = e.employee[2];
        thirdE.id = upEmployee.id ? upEmployee.id : e.id;
        thirdE.role = upEmployee.role ? upEmployee.role : e.role;
        thirdE.rate = upEmployee.rate ? upEmployee.rate : e.rate;
        fs.writeFile('src/data/projects.json', JSON.stringify(e), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(e);
          }res.status(200).send(e, { msg: 'Employee added' });
        });
      }
    });
  } else {
    res.status(404).json({ msg: `proyect not found with the id of ${req.params.id}` });
  }
});
// Add employee to DEV, QAS, TL, or PM (fourth employee)
router.put('/employee/:id/four', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        const fourthE = e.employee[3];
        fourthE.id = upEmployee.id ? upEmployee.id : e.id;
        fourthE.role = upEmployee.role ? upEmployee.role : e.role;
        fourthE.rate = upEmployee.rate ? upEmployee.rate : e.rate;
        fs.writeFile('src/data/projects.json', JSON.stringify(e), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(e);
          }res.status(200).send(e, { msg: 'Employee added' });
        });
      }
    });
  } else {
    res.status(404).json({ msg: `proyect not found with the id of ${req.params.id}` });
  }
});

// Put a project
router.put('/put/:id', (req, res) => {
  const found = jsonProject.some((e) => e.id === req.params.id);
  if (found) {
    const upEmployee = req.body;
    jsonProject.forEach((e) => {
      if (e.id === req.params.id) {
        e.name = upEmployee.name ? upEmployee.name : e.name;
        e.description = upEmployee.description ? upEmployee.description : e.description;
        e.startDate = upEmployee.startDate ? upEmployee.startDate : e.startDate;
        e.endDate = upEmployee.endDate ? upEmployee.endDate : e.endDate;
        e.clientName = upEmployee.clientName ? upEmployee.clientName : e.clientName;
        e.active = upEmployee.active ? upEmployee.active : e.active;
        e.admin = upEmployee.admin ? upEmployee.admin : e.admin;
        fs.writeFile('src/data/projects.json', JSON.stringify(e), (err) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(e);
          }res.status(200).send(e, { msg: 'Project modified' });
        });
      }
    });
  } else {
    res.status(404).json({ msg: `proyect not found with the id of ${req.params.id}` });
  }
});
module.exports = router;
