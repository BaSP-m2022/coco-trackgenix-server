// use "import" to import libraries
const express = require('express');

// use "require" to import JSON files
const admins = require('./data/admins.json');
const userRouter = require('./resources/tasks');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/tasks', userRouter);
app.get('/', async (req, res) => {
  res.send('Hello World!');
});
app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
