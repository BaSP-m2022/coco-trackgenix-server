// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const projects = require('./resources/projects');
const userRouter = require('./resources/tasks');
const timeSheetRouter = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;
app.use('/projects', projects);

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.use('/time-sheets', timeSheetRouter);
app.use('/tasks', userRouter);
app.use('/projects', projects);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
