const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var response = { errors: [] };
    let err_msgs = { ...errors };
    err_msgs.errors.forEach(async err => {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  try {
    const body = req.body;
    const dbusers = await User.find({ email: body.email });
    if (dbusers.length > 0) {
      return res.json({
        title: "Register",
        err: "Email id is taken, please choose another",
        msg: ""
      });
    }
    if (body.pass !== body.cpass) {
      return res.json({
        title: "Register",
        err: "Both password should match",
        msg: ""
      });
    }
    const hasedpass = await bcrypt.hash(body.pass, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: body.name,
      email: body.email,
      password: hasedpass,
      accept_terms: body.agree
    });
    const savedUser = await user.save();
    req.flash("success", "Registration success, You can login now...");
    res.json("/login");
  } catch (e) {
    res.json({
      title: "Register",
      err: e.message,
      msg: ""
    });
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var response = { errors: [] };
    let err_msgs = { ...errors };
    err_msgs.errors.forEach(async err => {
      response.errors.push(err.msg);
    });
    res.statusCode = 400;
    return res.json(response);
  }
  try {
    const body = req.body;
    const dbuser = await User.find({ email: body.email });
    if (dbuser.length < 1) {
      return res.json({
        title: "login",
        err: "User not exists",
        msg: ""
      });
    }
    const user = { ...dbuser[0]._doc };
    const cmp_pass = await bcrypt.compare(body.password, user.password);
    if (!cmp_pass) {
      return res.json({
        title: "login",
        err: "Password not matched",
        msg: ""
      });
    }
    if (cmp_pass) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        jwtKey,
        {
          expiresIn: "12h"
        }
      );
      return res.status(200).json({
        msg: "Auth success",
        token: token,
        user: user
      });
    }
    res.status(200).json({
      msg: "Auth failed",
      err: err
    });
  } catch (e) {
    res.json({
      title: "login",
      err: e.message,
      msg: ""
    });
  }
};
