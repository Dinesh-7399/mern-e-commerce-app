import express from "express";
import { createUser  , getAllUsers, loginUser , logOutCurrectUser , getCurrentUserProfile , updateCurrentUserProfile , deleteUserById} from "../controllers/user.controller.js";
const router = express();
import { authenticate , authorizeAdmin } from "../middlewares/auth.middleware.js";
router.route('/').post(createUser).get(authenticate , authorizeAdmin , getAllUsers);
router.post('/auth' , loginUser);
router.post('/logout' , logOutCurrectUser);
router.route('/profile').get(authenticate , getCurrentUserProfile).put(authenticate , updateCurrentUserProfile);
// admin route
router.route('/:id').delete(authenticate , authorizeAdmin , deleteUserById);
export default router;