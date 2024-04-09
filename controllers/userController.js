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

  res.status(201).json({
    success: true,
    user,
  });
});
