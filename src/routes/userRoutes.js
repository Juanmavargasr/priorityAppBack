const express = require("express");

const { validateUserInfoToCreate } = require("../services/userServices");

const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/users", validateUserInfoToCreate, createUser);

module.exports = router;
