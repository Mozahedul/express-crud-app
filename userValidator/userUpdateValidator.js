const { body, isEmail } = require("express-validator");
const SchoolModel = require("../models/userSchema/userModel");

const expressUpdateValidate = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First name should not be empty")
    .isLength({ min: 5, max: 20 })
    .withMessage("The character range must be between 5 - 20"),

  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Last name should not be empty")
    .isLength({ min: 5, max: 20 })
    .withMessage("The character range must be between 5 - 20"),

  body("email")
    .isEmail()
    .withMessage("Insert a valid Email like xxx@xxx.com")
    .custom(async (email, { req }) => {
      let userEmail = await SchoolModel.findOne({ email });
      console.log("from userUpdatePage: ", userEmail);
      // let dbUserEmail = userEmail.email;
      // let userInsertedEmail = req.body.email;
      if (userEmail) {
        return Promise.reject("The Email you entered already exists");
      }
    })
    .normalizeEmail(), // normalizeEmail() function prevents the multiple times signup attempts

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 5, max: 20 })
    .withMessage("Minimum 5 characters, maximum 20 characters"),
  // .not()
  // .isEmpty()
  // .withMessage("Password should not be empty")
  // .isLength({min: 5, max: 24})
  // .withMessage("The range must be between 5 - 24"),
  // .matches(/\d/)
  // .withMessage("Insert Only Number")

  //   body("password", "Invalid Password").custom((value, { req }) => {
  //     let { testPassword } = req.body;
  //     if (value !== testPassword) {
  //       throw new Error("Password Confirmation does not match password");
  //     }
  //     return true;
  //   }),
];

module.exports = expressUpdateValidate;
