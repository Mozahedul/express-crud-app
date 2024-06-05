const express = require("express");
const expressValidate = require("../userValidator/validator");
const expressUpdateValidator = require("../userValidator/userUpdateValidator");
const SchoolModel = require("../models/userSchema/userModel");
const CreateUser = require("../controllers/createUserController");
const UpdateUser = require("../controllers/updateUserController");
const loginUserValidator = require("../userValidator/loginValidator");
const controlUserLogin = require("../controllers/loginPostController");
const deleteUser = require("../controllers/deleteUserController");
const userViewGetControl = require("../controllers/userGetViewController");

const router = express.Router();

// view the user page to insert data
router.get("/create", (req, res) => {
  console.log(req.query.name);
  res.render("pages/signup/createUser", {
    serverError: req.flash("server-error"),
    // JSON.parse(decodeURIComponent(req.body.results))
    title: "Create User",
    errors: {},
    value: {},
  });
});

// Insert data into database
router.post("/create", expressValidate, CreateUser.createUserController);

// view data from database
router.get("/view", userViewGetControl.userGetViewController);

// for the view of individual user
router.get("/view/individual/:id", async (req, res, next) => {
  try {
    const docs = await SchoolModel.findById(req.params.id);
    res.render("pages/signup/individualUser", {
      title: "Individual User",
      data: docs,
    });
  } catch (error) {
    console.log("Error in individual user ==> ", error);
  }
});

// view the edit page
router.get("/edit/:id", async (req, res) => {
  console.log("REQUEST PARAMETERS ==>", req.params);

  try {
    const docs = await SchoolModel.findById(req.params.id);
    res.render("pages/signup/editUser", {
      title: "edit user page",
      data: docs,
      serverUpdateError: req.flash("server-update-error"),
    });
  } catch (error) {
    console.log("Error in edit user", error);
  }
});

// update the edit page
router.post(
  "/update/:id",
  expressUpdateValidator,
  UpdateUser.controlUserUpdate
);

// remove user from database
router.get("/delete/:id", deleteUser.deleteUserControl);

// ################# for login section ###########
router.get("/login", (req, res, next) => {
  console.log(req.session.isLoggedIn, req.session.user);
  res.render("pages/login/loginUser", {
    title: "Login user page",
    errors: {},
  });
  next();
});

router.post("/login", loginUserValidator, controlUserLogin.loginPostController);

module.exports = router;
