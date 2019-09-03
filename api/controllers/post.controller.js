const Post = require("../models/postads.model");
const mongoose = require("mongoose");


exports.getPosts = async (req, res, next) => {
  try {
      const dbPosts = await Post.find();
      res.status(200).json({...dbPosts});        
  } catch (e) {
      res.status(500).json({ msg: e.message });
  }
};

exports.savePost = async (req, res, next) => {
  var sess = req.session;
  if (sess.hasOwnProperty("islogin") && sess.islogin == true) {
    req.check("title", "Title required").notEmpty();
    req.check("title", "Category name required").notEmpty();
    req.check("title", "Category name required").notEmpty();
    req.check("title", "Category name required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      var response = { errors: [] };
      errors.forEach(function(err) {
        response.errors.push(err.msg);
      });
      res.statusCode = 400;
      return res.json(response);
    } else {
      try {
        
        const postads = new postads({
          _id: new mongoose.Types.ObjectId(),
          title:req.body.title,
          userid: req.sess.userid,
          categoryid: req.categoryid,
          location: req.body.location,
          days: req.body.days,
          description: req.body.description,
          amount: req.body.amount,
          photo: req.body.photo,
          video: req.body.video
        });

      } catch (e) {
        res.status(500).json({ msg: e.message });
      }
    }
  } else {
    req.flash("error", "Session expired");
    res.redirect("/login");
  }
};