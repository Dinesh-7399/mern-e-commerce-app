import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
  logOutCurrectUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";
const router = express();
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
  // http://localhost:5000/api/users/auth
router.post("/auth", loginUser);
router.post("/logout", logOutCurrectUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
// admin route
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
export default router;
