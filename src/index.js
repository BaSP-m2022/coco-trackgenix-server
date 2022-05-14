/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

// Server
const app = express();
const port = process.env.PORT || 3000;

const timeSheet = require("./models/Time-sheets");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const mongoDBURL = 'mongodb+srv://BaSP_datatabase:RadiumRocket@basp-coco.zj49d.mongodb.net/BaSP-Coco?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL, () => {
  console.log('Connection to database established');
}, () => console.log('Connection to database failed'));

// Routes
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
