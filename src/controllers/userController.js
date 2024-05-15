const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const constants = require("../constants");

const createUser = async (req, res) => {
  const { id, name, lastname, email, rol, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id,
      name: name.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      rol: rol.toLowerCase(),
    });

    var savedUser = await newUser.save();

    savedUser = {
      ...savedUser,
      password: "",
    };

    console.log(constants.userConstants.userSuccessfullyCreated);
    res.status(201).json({
      messaje: constants.userConstants.userSuccessfullyCreated,
      user: {
        id: newUser.id,
        name: newUser.name,
        lastName: newUser.lastname,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: constants.userConstants.erroCreatingUser });
  }
};

module.exports = { createUser };
