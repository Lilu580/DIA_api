import { userSchema } from './models/User.js';
import { getDB } from './db.js';
import bcrypt from 'bcryptjs';

const collection = getDB().collection('Users');

export const registration = async(req, res) => {
  try {
    const { email, phone, login, name, password } = req.body;
    const existingUser = await collection.findOne({ email });

    if (!userSchema.parse(req.body)) {
      return res.status(400).send('Invalid data');
    }

    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const hashPassword = bcrypt.hashSync(password, 7);


    const newUser = { email, phone, login, name, password: hashPassword };
    await collection.insertOne(newUser);

    res.status(200).send('Registration successful');
  } catch (error) {
    console.error('Error registering user:', error);

    res.status(500).send('An error occurred: ' + error.message);
  }
}

export const authorization = async(req, res) => {
  try {
    const { login, password } = req.body;

    const existingUser = await collection.findOne({ email });
    const validPassword = bcrypt.compareSync(password, existingUser.password);

    if(!existingUser) {
      return res.status(400).send(`No users with ${login} login found`);
    }

    if(!validPassword) {
      return res.status(400).send('invalid password');
    }

  } catch (error) {
    console.error('Error authorization user:', error);

    res.status(500).send('An error occurred: ' + error.message);
  }
}

export const getUsers = async(req, res) => {
  try {
    const collection = getDB().collection('Users');
    const document = await collection.find().toArray();
    
    res.json(document);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
}

