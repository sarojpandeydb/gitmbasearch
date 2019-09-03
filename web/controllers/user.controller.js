const {categories} = require("../helpers/utlity");

exports.dashboard = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    res.render("user/dashboard", {
      title: "Dashboard",
      error: "",
      message: "",
      user: sess.user
    });
  } else {
    req.flash("error", "Session expired");
    res.redirect("/login");
  }
};
exports.postAds = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    res.render("user/post-ads", {
      title: "post-ads",
      error: "",
      message: "",
      categories: await categories(),
      user: sess.user
    });
  } else {
    req.flash("error", "Session expired");
    res.redirect("/login");
  }
};

exports.profile = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    res.render("user/profile-setting", {
      title: "Profile-settings",
      error: "",
      message: "",
      user: sess.user
    });
  } else {
    req.flash("error", "Session expired");
    res.redirect("/login");
  }
};
