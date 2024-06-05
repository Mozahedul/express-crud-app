const SchoolModel = require("../models/userSchema/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const createUserController = async (req, res, next) => {
  let userModel = new SchoolModel();
  const { firstName, lastName, email, password } = req.body;

  const errors = validationResult(req);
  console.log("Error Result: ", errors);

  const errMsg = errors.formatWith(err => err.msg).mapped();
  // console.log(Object.keys(errMsg).length);

  if (req.body) {
    console.log("Request data: ", req.body);
    // errMsg defines the error messages of express-validator
    if (errMsg && Object.keys(errMsg).length < 1) {
      const salt = await bcrypt.genSalt(10);
      userModel.firstName = firstName;
      userModel.lastName = lastName;
      userModel.email = email;
      userModel.password = await bcrypt.hash(password, salt);

      try {
        await userModel.save();
        req.flash("server-success", "Data Inserted successfully");
        res.status(200).redirect("/user/view");
      } catch (error) {
        console.log("Error in user creation ==> ", error);

        req.flash("server-error", "Server Error: Data will not insert");
        res.status(500).redirect("/user/create");
      }
    } else {
      return res.render("pages/signup/createUser", {
        title: "Create User Page",
        errors: errMsg,
        value: {
          firstName,
          lastName,
          email,
          password,
        },
      });
    }
  }
};

module.exports = { createUserController };
