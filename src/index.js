import express from 'express';
import router from './resources/employees';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const adminsRouter = require('./resources/admins');
const superAdmins = require('./resources/super-admins');
const projects = require('./resources/projects');
const timeSheetRouter = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/admins', adminsRouter);

// router
app.use('/employees', router);
app.use('/projects', projects);
app.use('/superAdmins', superAdmins);
app.use('/time-sheets', timeSheetRouter);
app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
