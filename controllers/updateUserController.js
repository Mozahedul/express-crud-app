const SchoolModel = require("../models/userSchema/userModel");
const { validationResult } = require("express-validator");

const controlUserUpdate = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("Validation error: ", errors);

  const errMsg = errors.formatWith(err => err.msg).mapped();
  console.log("formatted Error: ", errMsg);

  if (req.body) {
    if (errMsg && Object.keys(errMsg).length === 0) {
      // findByIdAndUpdate(id, updateObject, options, callback function)

      try {
        await SchoolModel.findByIdAndUpdate(req.params.id, req.body);
        req.flash("update-server", "Data Updated Successfully");
        res.status(200).redirect("/user/view");
      } catch (error) {
        req.flash("server-update-error", error.message);
        res.status(204).redirect(`/user/edit/${req.params.id}`);
      }
    } else {
      req.flash("server-update-error", { errMsg: errMsg });
      res.status(204).redirect(`/user/edit/${req.params.id}`);
    }
  }
};

module.exports = { controlUserUpdate };
