const User = require("../models/userModel");
const constants = require("../constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUserInfoToCreate = async (req, res, next) => {
  const { id, name, lastname, email, rol, password } = req.body;
  try {
    if (!id || !name || !password || !rol || !lastname || !email) {
      res
        .status(400)
        .json({ error: constants.userConstants.allDataIsRequired });
    } else {
      const user = await User.findOne({ id });
      if (user) {
        res
          .status(400)
          .json({ error: constants.userConstants.userAlreadyExist });
      } else {
        console.log(constants.userConstants.successfullyInfoValidation);
        next();
      }
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: constants.userConstants.erroCreatingUser });
  }
};

const validateAdminRol = async (req, res, next) => {
  try {
    const { token } = res.cookie;
    const payload = jwt.decode(rol);

    if (payload.rol.toLowerCase() !== "admin") {
      res.status(401).json({
        message: constants.userConstants.unauthorized,
      });
    } else {
      next;
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      message: constants.userConstants.unableToValidateRol,
    });
  }
};

module.exports = {
  validateUserInfoToCreate,
  validateAdminRol,
};
