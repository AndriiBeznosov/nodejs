const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  console.log("pre seve", this);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
