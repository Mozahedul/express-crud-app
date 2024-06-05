const mongoose = require("mongoose");

// const uri = "mongodb://localhost:27017/school";
const uri =
  "mongodb+srv://softprogrammer:mozahed525@shoppingcluster.cwpyj.mongodb.net/student?retryWrites=true&w=majority&appName=shoppingCluster";

const connection = async function () {
  try {
    // mongoose.set("strictQuery", false);
    mongoose.connect(uri);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connection();
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// },
// (err) => {
//   if (!err) {
//     console.log("Database Connected successfully");
//   } else {
//     console.log("Some error on the mongoDB database");
//   }
// }
