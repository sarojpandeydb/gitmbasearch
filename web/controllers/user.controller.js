const { categories, countries, getPosts } = require("../helpers/utlity");

exports.dashboard = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    const post_data = await getPosts(sess.user._id);
    res.render("user/dashboard", {
      title: "Dashboard",
      error: "",
      message: "",
      posts: post_data.posts,
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
      countries: await countries(),
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
