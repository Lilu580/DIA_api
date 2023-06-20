import { userAuthSchema, userSchema } from "../schemas/User.js";
import { getDB } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const collection = getDB().collection("Users");
const secret = process.env.SECRET_KEY;

const generateAccesToken = ({
  id, 
  email, 
  login, 
  name, 
  phone
}) => {
  const payload = {
    id,
    email,
    login,
    name,
    phone,
  };

  return jwt.sign(payload, secret, { expiresIn: "12h" });
};

export const registration = async (req, res) => {
  try {
    const { email, phone, login, name, password } = req.body;

    const existingUserByEmail = await collection.findOne({
      $or: [{ email }, { login }, { phone }],
    });

    if (!userSchema.parse(req.body)) {
      return res.status(400).send("Bad request");
    }

    if (existingUserByEmail) {
      return res.status(400).send("User with this identefier already exists");
    }

    const hashPassword = await bcrypt.hash(password, 7);

    const newUser = { email, phone, login, name, password: hashPassword };

    await collection.insertOne(newUser);

    res.status(200).send("Registration successful");
  } catch (error) {
    console.error("Error registering user:", error);

    res.status(500).send("An error occurred: " + error.message);
  }
};

export const authorization = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!userAuthSchema.parse(req.body)) {
      return res.status(400).send("Bad request");
    }

    const existingUser = await collection.findOne({
      $or: [{ email: login }, { login }, { phone: login }],
    });
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!existingUser) {
      return res
        .status(400)
        .send(`No user found with the provided credentials`);
    }

    if (!validPassword) {
      return res.status(400).send("invalid password");
    }

    const token = generateAccesToken(
      existingUser._id,
      existingUser.email,
      existingUser.login,
      existingUser.name,
      existingUser.phone
    );

    return res.json({ token });
  } catch (error) {
    console.error("Error authorization user:", error);

    res.status(500).send("An error occurred: " + error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const collection = getDB().collection("Users");
    const document = await collection.find().toArray();

    res.json(document);
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).send("An error occurred: " + error.message);
  }
};
