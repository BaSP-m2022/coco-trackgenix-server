/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

// Server
const app = express();
const port = process.env.PORT || 3000;
const mongoDBURL = 'mongodb+srv://BaSP_datatabase:RadiumRocket@basp-coco.zj49d.mongodb.net/BaSP-Coco?retryWrites=true&w=majority';

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// async function adminMod()

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(
  mongoDBURL,
  (error) => {
    if (error) {
      console.log('Fail to connect', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);

