const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const session = require("express-session");
const flash = require("express-flash-messages");

//Database Connections Starts
const config = require("./api/configs/database");
mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", err => console.log(err));

//STATIC ROUTES
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/user", express.static(path.join(__dirname, "/public")));
app.use("/post", express.static(path.join(__dirname, "/public")));

//MIDDLEWARES
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(flash());
app.use(
    session({
        secret: process.env.MBA_SEARCH_SECRET,
        resave: true,
        saveUninitialized: true
    })
);
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

//api routes handler
const apiUserRoutes = require("./api/routes/user.route");
const apiCategoryRoute = require("./api/routes/category.route");
const apiSubCategoryRoute = require("./api/routes/sub-category.route");
const apiCountryRoute = require("./api/routes/country.route");
const apiStateRoute = require("./api/routes/state.route");
const apiCityRoute = require("./api/routes/city.route");
const apiPostRoute = require("./api/routes/post.route");
app.use("/api/user", apiUserRoutes);
app.use("/api/category", apiCategoryRoute);
app.use("/api/subcategory", apiSubCategoryRoute);
app.use("/api/country", apiCountryRoute);
app.use("/api/state", apiStateRoute);
app.use("/api/city", apiCityRoute);
app.use("/api/post", apiPostRoute);

//web routes handler
const webRoutes = require("./web/routes/home.route");
const webUserRoutes = require("./web/routes/user.route");
// app.use("/post", webPostRoutes);
// app.use("/category", webCategoryRoutes);
app.use("/", webRoutes);
app.use("/user", webUserRoutes);

//TEST ROUTE
const testRoutes = require("./web/routes/test.route");
app.use("/test", testRoutes);

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