const express = require('express');

const projects = require('../data/projects.json');

const router = express.Router();

// Create a Project - POST

// Modify a Project - PUT

// Get a Project - GET

router.get('/getProjectById/:id', (req, res) => {
  const projectId = req.params.id;
  const selectedProject = projects.find((project) => project.id === projectId);
  if (selectedProject) {
    res.send(selectedProject);
  } else {
    res.send('Project not found.');
  }
});

module.exports = router;
