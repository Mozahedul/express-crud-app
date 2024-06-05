const SchoolModel = require("../models/userSchema/userModel");

const userGetViewController = async (req, res) => {
  try {
    const docs = await SchoolModel.find({});
    docs.reverse();
    res.render("pages/signup/viewUser", {
      title: "view user page",
      data: docs,
      serverSuccess: req.flash("server-success"),
      updateServer: req.flash("update-server"),
      serverDelete: req.flash("server-delete"),
    });
  } catch (error) {
    console.log("Error in user view");
    process.exit(1);
  }
};

module.exports = { userGetViewController };
