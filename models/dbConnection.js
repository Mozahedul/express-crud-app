const mongoose = require("mongoose");

console.log("process ==>", process.env.uri);

// const uri = "mongodb://localhost:27017/school";
const connection = async function () {
  try {
    // mongoose.set("strictQuery", false);
    mongoose.connect(process.env.URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    res.send(error);
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
