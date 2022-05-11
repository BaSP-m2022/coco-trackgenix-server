const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

// Create a Project - POST
const generateId = () => {
  let count = 0;
  projects.forEach((project) => {
    count += 1;
    if (count !== project.id) {
      return count;
    }
    return null;
  });
  count += 1;
  return count;
};

router.post('/', (req, res) => {
  const newProject = {
    id: generateId(),
    ...req.body,
  };
  projects.push(newProject);
  const {
    name,
    description,
    clientName,
    startDate,
    endDate,
    employee,
    admin,
  } = newProject;
  if (name && description && clientName && startDate && endDate && employee && admin) {
    res.json(newProject);
  } else {
    res.json({ msg: 'Please, check your data is complete.' });
  }
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created!');
    }
  });
});

// Get a Project - GET
router.get('/', (req, res) => {
  res.send(projects);
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const selectedProject = projects.find((project) => project.id === projectId);
  if (selectedProject) {
    res.send(selectedProject);
  } else {
    res.send('Project not found.');
  }
});

module.exports = router;
