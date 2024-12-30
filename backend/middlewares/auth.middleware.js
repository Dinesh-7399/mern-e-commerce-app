import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async(req , res , next) => {
  let token;

  // read the jwt from the cookie 
  token = req.cookies.jwt;

  if(token){
    try {
      const decoded = jwt.verify(token , process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized , token failed ")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized , no token");
  }
});

// check for the admin 

const authorizeAdmin = (req , res , next) => {
  if(req.user && req.user.isAdmin){
    next()
  } else {
    res.status(401).send('Not authorize as admin');
  }
}
export {authenticate , authorizeAdmin};

