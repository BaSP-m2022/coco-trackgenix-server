// use "import" to import libraries
import express from 'express';
// use "require" to import JSON files
const superAdmins = require('./resources/super-admins');
const admins = require('./data/admins.json');
const projects = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});
app.use('/projects', projects);
app.use('/superAdmins', superAdmins);
app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
