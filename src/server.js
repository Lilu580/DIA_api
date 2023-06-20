import express from "express";
import { connectToMongoDB, getDB } from "./db.js";
import bodyParser from "body-parser";
import authRouter from "./auth/authRouter.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRouter);

const start = () => {
  try {
    app.listen(PORT, () => {
      connectToMongoDB();
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
