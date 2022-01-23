const User = require("../models/User");
const jwt = require("jsonwebtoken");
//Handle Errors

const handleErrors = (err) => {
  let error = { email: "", password: "" };
  console.log(err.message, err.code);
  //dıplicate error
  if (err.code === 11000) {
    error.email = "Email is already registered";
    return error;
  }
  // Incorrect Email
  if (err.message === "User not found") {
    error.email = "There is no user with that email";
  }
  // Incorrect Password
  if (err.message === "Incorrect Password") {
    error.password = "Password incorrect";
  }

  //catching validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }

  return error;
};

//CREATE TOKEN
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "MyJwtSecret", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};

//CREATE USER
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//LOGIN USER
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/")
};
