const express = require("express");
const app = express();
const errorHandler = require("./middlewares/error");

app.use(express.json());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorHandler);

module.exports = app;
