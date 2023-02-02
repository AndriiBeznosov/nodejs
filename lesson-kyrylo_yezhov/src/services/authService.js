const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require("../db/userModel");
const { Verification } = require("../db/verification");

const { NotAuthorizedError } = require("../helpers/errors");

const registration = async (email, password) => {
  const user = new User({ email, password });
  await user.save();

  //sha256('Hello')
  const code = sha256(email + process.env.JWT_SECRET);

  const verification = new Verification({
    userId: user._id,
    code: code,
  });

  await verification.save();
  const msg = {
    to: email,
    from: "andreyservis@ukr.net", // Use the email address or domain you verified above
    subject: "Thank you for registration",
    text: `Please, confirm your email address POST http://localhost:3001/api/auth/registration-confirmation/${code}`,
    html: `<h1 style="color:DodgerBlue;">Please, <a style="color:gren;" href='http://localhost:3001/api/auth/registration-confirmation/${code}'>confirm</a> confirm your email address</h1>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new NotAuthorizedError(error.message);
  }
  return user;
};

const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({ code, active: true });

  if (!verification) {
    throw new NotAuthorizedError("Invalid or expired confirmetion code");
  }

  const user = await User.findById(verification.userId);

  if (!user) {
    throw new NotAuthorizedError("No user found...");
  }
  verification.active = false;
  await verification.save();

  user.confirmed = true;
  user.save();
  const msg = {
    to: user.email,
    from: "andreyservis@ukr.net", // Use the email address or domain you verified above
    subject: "Thank you for registration",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div>
    <h1 style="color:DodgerBlue;">User registration was successful </h1>
    <p>${user.email}</p>
    </div>`,
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response);
  } catch (error) {
    throw new NotAuthorizedError(error.message);
  }

  // const user = new User({ email, password });
  // await user.save();

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, confirmed: true });

  if (!user) {
    throw new NotAuthorizedError(`No user wich "${email}" found...`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`No user wich "${password}" found...`);
  }
  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET,
  );
  return token;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email, confirmed: true });
  if (!user) {
    throw new NotAuthorizedError(`No user wich "${email}" found...`);
  }

  const password = sha256(Date.now() + process.env.JWT_SECRET);
  user.password = password;
  await user.save();

  const msg = {
    to: user.email,
    from: "andreyservis@ukr.net", // Use the email address or domain you verified above
    subject: "Fargot password",
    text: `Here is your temporaty password: ${password}`,
    html: `<h1 style="color:DodgerBlue;">Here is your temporaty password: ${password}</h1>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new NotAuthorizedError(error.message);
  }
};

module.exports = {
  registration,
  login,
  registrationConfirmation,
  forgotPassword,
};
