import express from "express";
import {registerUser,login,logout,myProfile,getUser,updateDiary} from '../controllers/User.js';
import {isAuthenticated} from '../middleware/auth.js'
export const userRouter=express.Router();
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/user").get(getUser);
userRouter.route("/update").post(updateDiary)

userRouter.route("/me").get(isAuthenticated, myProfile);
