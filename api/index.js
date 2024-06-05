const express = require("express");
const path = require("path");
const dbRoutes = require("../routes/dbRoutes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const flash = require("connect-flash");
require("../models/dbConnection");
// const morgan = require("morgan");
const SECRET_KEY = "mozahedul";

const app = express();
const port = 3000;

// custom middleware for
/* function customMiddleware(req, res, next) {
  console.log("I am from custom middleware");
  next();
}

const tinyLogger = () => {
  return (req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
  };
};

const middleware = [customMiddleware, tinyLogger()];
app.use(middleware);
*/

// cookie-parser
app.use(cookieParser());

// express-session
app.use(
  session({
    secret: process.env.SECRET_KEY || SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    //
  })
);

app.use(flash());

app.set("view engine", "ejs");

const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// for user validation
// app.use("/users", userValidation)
// app.use(morgan("dev"));
app.use("/user", dbRoutes);
app.get("/", (req, res) => {
  res.render("pages/index", { title: "Home Page" });
});
app.get("*", (req, res) => {
  res.render("pages/error", {
    title: "404 Page",
  });
});

app.listen(port, err => {
  if (!err) {
    console.log(`Server connected on the port ${port}`);
  } else {
    console.log("Some error" + err.code);
  }
});
