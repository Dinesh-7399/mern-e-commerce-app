import express from "express";
import  createUser from "../controllers/user.controller.js";
const router = express();
router.route('/').post(createUser);

export default router;