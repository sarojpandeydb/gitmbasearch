const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("express-validator");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

const config = require("./api/configs/database");

//api routes handler
const apiUserRoutes = require("./api/routes/user.route");
const apiCategoryRoute = require("./api/routes/category.route");
const apiPostRoute = require("./api/routes/post.route");

//web routes handler
const webRoutes = require("./web/routes/home.route");
const webUserRoutes = require("./web/routes/user.route");

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/user", express.static(path.join(__dirname, "/public")));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(validator());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: process.env.MBA_SEARCH_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

//Database Connections Starts
mongoose.connect(config.database, {
  useCreateIndex: true,
  useNewUrlParser: true
});
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", err => console.log(err));
//Database Connections Ends

//api routes
app.use("/api/user", apiUserRoutes);
app.use("/api/category",apiCategoryRoute);
app.use("/api/post",apiPostRoute);
//web routes
app.use("/", webRoutes);
app.use("/user", webUserRoutes);
// app.use("/post", webPostRoutes);
// app.use("/category", webCategoryRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
