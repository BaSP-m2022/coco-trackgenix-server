import express from 'express';
import router from './resources/employees';

// use "require" to import JSON files
const projects = require('./resources/projects');
const timeSheetRouter = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Routers
app.use('/time-sheets', timeSheetRouter);
app.use('/employees', router);
app.use('/projects', projects);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
