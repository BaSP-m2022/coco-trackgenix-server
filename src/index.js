// use "import" to import libraries
// import express from 'express';
const express = require('express');

// use "require" to import JSON files
const admins = require('./data/admins.json');

const app = express();
const port = process.env.PORT || 3000;
const superAdmins = require('./resources/super-admins');

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/superAdmins', superAdmins.getAllSuperAdmins);

app.get('/superAdmins/:id', superAdmins.getOneSuperAdmin);

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
