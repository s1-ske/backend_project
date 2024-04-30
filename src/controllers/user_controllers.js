const catchAsyncError = require("../middleware/catchAsyncError");

const {
  ValidateUser,
  CreateUser,
  LoginValidate,
  LoginUser,
  getUserById,
  update,
  getUserByEmail,
} = require("../service/user_service");

const { Authentication } = require("../middleware/Auth");
const { respo, createToken, verifyToken, hash } = require("../utils/util");

exports.SignUpUser = catchAsyncError(async (req, res) => {
  const data = await ValidateUser(req.body, res);
  await CreateUser(data, res);
});

exports.Login = catchAsyncError(async (req, res) => {
  const data = await LoginValidate(req.body, res);
  await LoginUser(data, res);
});

exports.getUserProfile = catchAsyncError(async (req, res) => {
  const user = req.user;
  console.log(req.user);
  respo(res, 200, "profile got", user);
});

exports.updatePassword = catchAsyncError(async (req, res) => {
  await update(req, res);
});

exports.forgotPassword = catchAsyncError(async (req, res) => {
  const { email } = req.params;
  const user = await getUserByEmail(email, res);
  const passToken = await createToken(user?._id);
  respo(res, 200, "successfuly gen token", { passToken });
});

exports.verifyUserForgotPass = catchAsyncError(async (req, res) => {
  const data = await verifyToken(req.query.token);
  console.log(data);
  if (!data) {
    throw new Error("No valid token");
  }
  const limitTime = Number(data.iet) + 10 * 60 * 1000;
  console.log(limitTime, Date.now());
  const isValidTime = limitTime > Number(Date.now()); // 2:25 > 2:15
  console.log(isValidTime);
  if (!isValidTime) throw new Error("Request Timeout ");
  const user = await getUserById(data.id);
  const newPassword = await hash(req.query.pass);
  user.password = newPassword;
  await user.save();
  respo(res, 200, "updated succesfully", user);
});
