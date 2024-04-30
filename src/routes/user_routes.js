const express = require("express");
const { SignUpUser, Login ,getUserProfile, updatePassword, forgotPassword, verifyUserForgotPass} = require("../controllers/user_controllers");
const { Authentication } = require("../middleware/Auth");

const Userrouter = express.Router();

Userrouter.post("/signup",SignUpUser);
Userrouter.post("/login",Login);
Userrouter.get("/profile",Authentication,getUserProfile)
Userrouter.post("/update/password",Authentication,updatePassword);
Userrouter.post("/forget/:email",forgotPassword);
Userrouter.post("/token",verifyUserForgotPass)

module.exports=Userrouter;