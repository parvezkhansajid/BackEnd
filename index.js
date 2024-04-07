const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;

const connectDB = require("./config/database");
connectDB();

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
