const express = require("express");

const {
  validateUserInfoToCreate,
  validateAdminRol,
} = require("../services/userServices");

const { createUser, getUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/users", validateAdminRol, validateUserInfoToCreate, createUser);
router.get("/:id", getUserById);

module.exports = router;
