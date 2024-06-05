const { validationResult } = require("express-validator");
const SchoolModel = require("../models/userSchema/userModel");
const bcrypt = require("bcrypt");

const loginPostController = async (req, res, next) => {
  const { email, password } = req.body;

  const error = validationResult(req);
  const errorMsg = error.formatWith((err) => err.msg).mapped();

  if (!errorMsg && Object.keys(errorMsg).length !== 0) {
    return res.render("pages/login/loginUser", {
      title: "login page",
      errors: errorMsg,
    });

    // res.status(200).redirect("/");
  }

  try {
    let user = await SchoolModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid email Credentials",
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid Password credentials",
      });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;

    res.render("pages/login/loginUser", {
      title: "Login Account",
      // errors: {},
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { loginPostController };
