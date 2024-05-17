const express = require("express");

const { logIn } = require("../utils/auth");

const router = express.Router();

router.post("/auth", logIn);

module.exports = router;
