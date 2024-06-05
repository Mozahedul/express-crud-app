const SchoolModel = require("../models/userSchema/userModel");

const deleteUserControl = async (req, res) => {
  console.log("REQUEST PARAMS ==>", req.params);

  try {
    await SchoolModel.findByIdAndDelete(req.params.id);
    req.flash("server-delete", "Deleted the data successfully");
    res.status(200).redirect("/user/view");
  } catch (error) {
    console.log("some error on deleting ==> ", error);
  }
};

module.exports = { deleteUserControl };
