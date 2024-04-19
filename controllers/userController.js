const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncErros(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "PublicId",
      url: "publicUrl",
    },
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!password) {
    return next(new ErrorHandler("Invalid Email or Password!", 401));
  }

  sendToken(user, 200, res);
});
