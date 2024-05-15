const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trime: true, unique: true }, // property  unique: true not working, unique validation done trough a middleware
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trime: true,
      unique: true,
    },
    rol: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
  { collection: "users" }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
