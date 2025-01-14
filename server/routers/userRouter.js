import express from "express";
import {signUp,login} from '../controller/userController.js'

const router = express.Router();

//singupRouter
router.post("/signup",signUp);

//signin
router.post("/signin",login);

export default router;


