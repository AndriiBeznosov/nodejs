const { User } = require("../models/user");
const { HttpError } = require("../helpers");
// const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email, password } = req.body;
  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const saveUser = await User.create({ email, password });
    res.status(201).json({ data: { user: saveUser } });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      // throw new HttpError(409, "User with this email already exists ");
      throw Conflict("User with this email already exists ");
    }
    throw error;
    // res.status(409).json({ message: error.message });
    // process.exit(1);
  }
}
async function login(req, res) {
  const { JWT_SECRET } = process.env;
  const { email, password } = req.body;

  const storedUser = await User.findOne({ email });
  if (!storedUser) {
    throw new HttpError(401, "email is not valid");
  }

  const isPaswirdValid = await bcrypt.compare(password, storedUser.password);
  if (!isPaswirdValid) {
    throw new HttpError(401, "password is not valid");
  }
  const payload = { id: storedUser._id, email: storedUser.email };
  const token = await jwt.sign(payload, JWT_SECRET);
  res.json({ data: { token } });
}

module.exports = {
  register,
  login,
};
