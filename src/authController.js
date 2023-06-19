import { userSchema } from './models/User.js';
import { getDB } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from './config.js';

const collection = getDB().collection('Users');

const generateAccesToken = (id, email, login, name, phone) => {
  const payload = {
    id,
    email,
    login,
    name,
    phone
  }

  return jwt.sign(payload, secret, {expiresIn: "12h"});
}

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
    const { email, password, login, phone } = req.body;

    const existingUser = await collection.findOne({
      $or: [{ email }, { login }, { phone }],
    });
    const validPassword = bcrypt.compareSync(password, existingUser.password);

    if(!existingUser) {
      return res.status(400).send(`No user found with the provided credentials`);
    }

    if(!validPassword) {
      return res.status(400).send('invalid password');
    }

    const token = generateAccesToken(
      existingUser._id, 
      existingUser.email, 
      existingUser.login, 
      existingUser.name, 
      existingUser.phone
    );
    
    return res.json({token});
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

