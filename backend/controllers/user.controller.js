import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";

const createUser  = asyncHandler(async(req , res) => {
  const {username , email , password} = req.body;
  console.log(`${username} , ${email} , ${password}`);
  res.send('OK');
});

export default createUser;