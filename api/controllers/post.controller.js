const Post = require("../models/postads.model");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const uploadfiles = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([{ name: "photos", maxCount: 5 }]);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

exports.getPosts = async (req, res, next) => {
  try {
    const dbPosts = await Post.find();
    res.status(200).json([...dbPosts]);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.savePost = async (req, res, next) => {
  req.check("btitle", "Title required").notEmpty();
  req.check("userid", "User id required").notEmpty();
  req.check("categoryid", "Categoryid required").notEmpty();
  req.check("subctid", "Sub-category id required").notEmpty();
  req.check("baddress", "Business address is required").notEmpty();
  req.check("bcountry", "Business Country required").notEmpty();
  req.check("bstate", "Business state required").notEmpty();
  req.check("bcity", "Business city required").notEmpty();
  req.check("bemail", "Business email required").notEmpty();
  req.check("bemail", "Valid email required").isEmail();
  req.check("bphone", "Business phone required").notEmpty();
  req
    .check("termsncondition", "Please agree to our terms and condition")
    .notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var response = [];
    errors.forEach(err => {
      response.push(err.msg);
    });
    res.statusCode = 400;
    //return res.json(response);
    req.flash("err", response);
    return res.redirect("/user/post-ads");
  }
  try {
    if (req.files) {
      const {
        btitle,
        userid,
        categoryid,
        subctid,
        baddress,
        bcountry,
        bstate,
        bcity,
        bemail,
        bphone,
        termsncondition
      } = req.body;
      const postads = new Post({
        _id: new mongoose.Types.ObjectId(),
        btitle: btitle,
        userid: userid,
        categoryid: categoryid,
        subctid: subctid,
        baddress: baddress,
        bcountry: bcountry,
        bstate: bstate,
        bcity: bcity,
        bemail: bemail,
        bphone: bphone,
        burl: req.body.burl,
        images: req.files["photos"],
        price: req.body.price,
        description: req.body.desc,
        termsncondition: termsncondition
      });
      const savedPostAd = await postads.save();
      //res.status(201).json(savedPostAd);
      return res.redirect("/user/dashboard");
    } else {
      //res.status(201).json({ req });
      req.flash("err", "please");
      return res.redirect("/user/post-ads");
    }
  } catch (e) {
    //res.status(500).json(e.message);
    req.flash("err", e.message);
    return res.redirect("/user/post-ads");
  }
};
