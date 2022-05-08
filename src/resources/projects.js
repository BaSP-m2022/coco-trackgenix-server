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
// router.put('/edit', (req, res) => {

// server.put('api/memebers/:id', (req, res) => {
//     const found = members.some(idFilter(req));
//     if (found) {
//     members.forEach((member, i) => {
//     if (idFilter(req)(member)) {
//     const updMember = {...member, ...req.body};
//     members[i] = updMember
//     res.json({ msg: 'Member updated', updMember });
//     }
//     });
//     } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//     }
//     });
// Get a Project - GET
router.get('/getAll', (req, res) => {
  res.send(projects);
});

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
