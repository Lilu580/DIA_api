import express from 'express';
import { connectToMongoDB, getDB } from './db.js';
import bodyParser from 'body-parser';
import router from './authRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', router);

const start = () => {
  try {
    app.listen(PORT, () => {
      connectToMongoDB();
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
