// use "import" to import libraries
// import express from 'express';
const express = require('express');

// use "require" to import JSON files
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const superAdmins = require('./resources/super-admins');
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/superAdmins', superAdmins);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
