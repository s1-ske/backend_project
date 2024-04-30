const { respo, hash, hashcompare, createToken } = require("../utils/util");

const User = require("../model/user-model");

const ValidateUser = async (data, res) => {
  let { name, email, password } = data;
  const available = await User.findOne({ email });
  if (available) {
    throw new Error("user already exists");
  }
  if (!name || !email || !password) {
    return respo(res, 400, "please fill the details");
  }
  const userpassword = await hash(password);
  return { name, email, password: userpassword };
};

const CreateUser = async (data, res) => {
  if (!data) {
    return respo(res, 404, "data is missing", {});
  }
  const user = await User.create(data);
  respo(res, 200, "User Created Scucessfully", user);
};

const LoginValidate = async (data, res) => {
  const { email, password } = data;
  if (!email || !password) {
    return respo(res, 404, "fill the data", {});
  }
  return { email, password };
};

const LoginUser = async (data, res) => {
  if (!data) {
    return respo(res, 400, "data missing", {});
  }
  const { email, password } = data;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    return respo(res, 400, "user not found", {});
  }
  const equal = await hashcompare(password, user.password);
  if (!equal) {
    return respo(res, 400, "no creds found", {});
  }
  let id = user._id;
  const Token = await createToken(id);

  respo(res, 200, "login sucessfully", { user, Token });
};

const getUserById = async (id) => {
  if (!id) {
    return respo(res, 200, "ID was not found", {});
  }
  const user = await User.findById(id);
  if (!user) {
    return respo(res, 200, "ID was not found", {});
  }
  return user;
};
const getUserByEmail = async (email,res) => {
  if (!email) {
    return respo(res, 200, "ID was not found", {});
  }
  const user = await User.findOne({email});
  if (!user) {
    return respo(res, 200, "ID was not found", {});
  }
  return user;
};



const update = async (data, res) => {
  const { updatepassword, password } = data.body;
  const id = data.user._id;
  const user = await getUserById(id);
  console.log(user);
  const equal = await hashcompare(password, user.password);
  console.log(equal);
  if (!equal) {
    return respo(res, 400, "invalid cred", {});
  }
  user.password = await hash(updatepassword);
  await user.save();
  return respo(res, 200, "password updated sucessfully", user);
};

module.exports={getUserById,update,LoginUser,LoginValidate,CreateUser,ValidateUser,getUserByEmail}
