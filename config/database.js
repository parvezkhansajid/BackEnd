const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Database connected to: ${data.connection.host}`);
  });
};

module.exports = connectDB;
