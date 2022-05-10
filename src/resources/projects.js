const express = require('express');
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
  const {
    name,
    description,
    clientName,
    startDate,
    endDate,
    devRate,
    qaRate,
    pmRate,
    tiRate,
    projectManager,
    techLeader,
    admin,
  } = newProject;
  if (name && description && clientName && startDate && endDate && devRate && qaRate
        && pmRate && tiRate && projectManager && techLeader && admin) {
    res.json(newProject);
  } else {
    res.json({ msg: 'Please, check your data is complete.' });
  }
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
