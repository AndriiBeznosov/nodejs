const express = require("express");
const router = new express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  registrationController,
  loginController,
  registrationConfirmedController,
  forgotPasswordController,
} = require("../controllers/authController");

router.post("/registration", asyncWrapper(registrationController));
router.post("/forgot_password", asyncWrapper(forgotPasswordController));
router.get(
  "/registration-confirmation/:code",
  asyncWrapper(registrationConfirmedController),
);
router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
