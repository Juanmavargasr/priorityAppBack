const express = require("express");

const { validateUserInfoToCreate } = require("../services/userServices");

const { createUser, getUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/users", validateUserInfoToCreate, createUser);
router.get("/:id", getUserById);

module.exports = router;
