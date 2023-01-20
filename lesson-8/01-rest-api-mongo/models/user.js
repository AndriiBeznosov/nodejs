const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true, //-> створює індекс, котрий забороняє створювати користувача з однаковим індексом
      match: [/[a-z0-9]+@[a-z0-9]/, "user email is not valid"],
    },
    password: {
      type: String,
      minLength: [6, "password should be at least 6 characters long"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
