const express = require("express");
const { connectDB } = require("./src/db");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const constants = require("./src/constants");

const javier = {
  origin: "https://2h7cx4mc-8081.use2.devtunnels.ms",
  credentials: true,
};

const port = process.env.SECRET_PORT;
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(javier));

app.use((req, res, next) => {
  const validReqs = ["POST", "GET", "PUT", "PATCH", "DELETE"];
  const method = req.method.toUpperCase;

  if (!validReqs.includes(method)) {
    res.status(400).json({
      message: constants.appConstants.notAllowedMethod,
    });
  } else {
    next();
  }
});

app.use("/users", userRoutes);
app.use("/logIn", authRoutes);

connectDB();
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
