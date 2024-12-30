import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.utils.js';
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  }

  // will add salt to the password i.e some random chars in between the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    createToken(res , newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export default createUser;
