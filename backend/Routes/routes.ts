import express from 'express';
const router = express.Router()
import createUser from "../controller/signup"
import login from '../controller/login';
import userData from '../controller/user';
import validator from "../middleware/validator";
import jwttoken from '../middleware/jwttoken';
import jwtAuthenticator from "../middleware/jwtAuthenticator";

router.post('/signup',validator,createUser)
router.post('/login',jwttoken,login)
router.get('/profile',jwtAuthenticator,userData.getUserData)
router.patch('/profile',jwtAuthenticator,userData.updateUserData)
router.delete('/profile',jwtAuthenticator,userData.deleteUser)

export default router
// module.exports = signupRouter