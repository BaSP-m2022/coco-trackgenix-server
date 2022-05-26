// Use import to import libraries
import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
