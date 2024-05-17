const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const constants = require("../constants");

const logIn = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ id });

    if (!user) {
      res.status(401).json({
        message: constants.logInConstants.invalidInfo,
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(401).josn({
        message: constants.logInConstants.invalidInfo,
      });
    }

    const payload = JSON.parse(JSON.stringify(user));
    delete payload.password;
    delete payload.isActive;
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.__v;

    const generateAccessToken = (payload) => {
      return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "60m" });
    };

    const accessToken = generateAccessToken(payload);

    {
      res.cookie("token", accessToken, { httpOnly: true, secure: false });
      res.status(200).json({
        message: constants.logInConstants.successfulLogIn,
        token: accessToken,
        user: payload,
      });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      message: constants.logInConstants.invalidLogin,
    });
  }
};

module.exports = { logIn };
