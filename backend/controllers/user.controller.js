import asyncHandler from "../middlewares/asyncHandler.js";
// import user from "../models/user.model.js";
import User from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`${username} , ${email} , ${password}`);
  if (!username || !password || !email) {
    throw new Error("Please fill all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  }
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
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
