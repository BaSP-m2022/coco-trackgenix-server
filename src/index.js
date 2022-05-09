import express from 'express';
import router from './resources/employees';

const employees = require('./data/employees.json');

const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());

// endpoints
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/employees', (req, res) => {
  res.status(200).json({
    data: employees,
  });
});

// Router
app.use('/employees', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
