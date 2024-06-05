const { body } = require("express-validator");
// const SchoolModel = require("../models/userSchema/userModel");

const loginUserValidator = [
  body("email").not().isEmpty().withMessage("Email should not be empty"),
  body("password").not().isEmpty().withMessage("Password should not be empty"),
];

module.exports = loginUserValidator;
