const { respo } = require("../utils/util");
const { verifyToken } = require("../utils/util");
const { getUserById } = require("../service/user_service");
const catchAsyncError = require("./catchAsyncError");

exports.Authentication = catchAsyncError(async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    return respo(res, 404, "token was not found", {});
  }
  const data = await verifyToken(token);
  // console.log(data);
  const user = await getUserById(data?.id);
  req.user = user;
  // console.log(req.user)
  // console.log(user)
  next();
});
