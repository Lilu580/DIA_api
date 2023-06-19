import express from 'express';
import { connectToMongoDB, getDB } from './db.js';

const PORT = 3000;

const app = express();

connectToMongoDB().catch(console.error);

app.get('/registration', async (req, res) => {
  try {
    const collection = getDB().collection('Users');
    const documents = await collection.find().toArray();
    res.json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server listening on port: ${PORT}`);
});
