const express = require("express");
const { connectDB } = require("./src/db");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

const javier = {
  origin: "https://2h7cx4mc-8081.use2.devtunnels.ms",
  credentials: true,
};

const port = process.env.SECRET_PORT;
const userRoutes = require("./src/routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(javier));

app.use("/users", userRoutes);

connectDB();
app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
