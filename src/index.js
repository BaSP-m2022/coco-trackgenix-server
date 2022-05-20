/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// Server
dotenv.config({ path: './.env' });
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.DATABASE_URL;

// async function adminMod()

mongoose.connect(
  MONGO_URL,
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
