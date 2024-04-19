const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

exports.loginUser = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password!", 400));
  }

  const user = User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password!", 401));
  }

  const isPasswordMatched = user.comparePassword();

  if (!password) {
    return next(new ErrorHandler("Invalid Email or Password!", 401));
  }

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});
