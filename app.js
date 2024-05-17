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
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(javier));

app.use((req, res, next) => {
  try {
    const valideRequest = ["GET", "POST", "PUT", "DELETE"];
    const method = req.method.toUpperCase();
    if (!valideRequest.includes(method)) {
      return res
        .status(400)
        .json({ error: constants.appConstants.notAllowedMethod });
    }
  } catch (error) {
    console.error("Error checking methods", error);
    res.status(500).json({ error: constants.appConstants.notAllowedMethod });
  }
  next();
});

app.use("/users", userRoutes);
app.use("/logIn", authRoutes);

connectDB();
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
