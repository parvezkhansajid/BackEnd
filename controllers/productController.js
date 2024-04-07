const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product Created Successfully!",
  });
};

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    message: true,
    products,
  });
};

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product Updated Successfully!",
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404));
  }

  await Product.deleteOne(product);
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully!",
  });
};
