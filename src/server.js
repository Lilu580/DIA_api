import express from 'express';
import { connectToMongoDB, getDB } from './db.js';
import bodyParser from 'body-parser';
import { validateEmail } from './validators/validateEmail.js';
import { validatePhone } from './validators/validatePhone.js';

const PORT = 3000;

const app = express();

connectToMongoDB().catch(console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registration', async (req, res) => {
  try {
    const { email, phone, login, name, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send('Invalid email format');
    }

    if (!validatePhone(phone)) {
      return res.status(400).send('Invalid phone number format');
    }

    // if (!validateName(name)) {
    //   return res.status(400).send('Invalid name');
    // }

    // if (!validateLogin(login)) {
    //   return res.status(400).send('Invalid login');
    // }

    // if (!validatePassword(password)) {
    //   return res.status(400).send('Invalid password');
    // }

    const collection = getDB().collection('Users');
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }


    const newUser = { email, phone, login, name, password };
    const result = await collection.insertOne(newUser);

    res.status(200).send('Registration successful');
  } catch (error) {
    console.error('Error registering user:', error);

    res.status(500).send('An error occurred: ' + error.message);
  }
});

app.get('/', async (req, res) => {
  try {
    const collection = getDB().collection('Users');
    const document = await collection.find().toArray();
    
    res.json(document);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
})

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server listening on port: ${PORT}`);
});
