const express = require('express');
const fs = require('fs');
const projects = require('../data/projects.json');

const router = express.Router();

// Create a Project - POST
router.post('/add', (req, res) => {
  const projectData = req.body;
  if (projectData.name && projectData.description && projectData.clientName) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project created!');
      }
    });
  }
});
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
