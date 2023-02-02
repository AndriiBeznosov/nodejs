const {
  registration,
  login,
  registrationConfirmation,
  forgotPassword,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);
  res.status(201).json({ user: user });
};
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const user = await forgotPassword(email);
  res.status(201).json({
    message: "Password updated successfully",
    email,
  });
};

const registrationConfirmedController = async (req, res) => {
  const { code } = req.params;
  const user = await registrationConfirmation(code);
  res.status(201).json({ user: user });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.json({ status: "seccess", token });
};

module.exports = {
  registrationController,
  loginController,
  registrationConfirmedController,
  forgotPasswordController,
};
