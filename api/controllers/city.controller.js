const City = require("../models/city.model");
const mongoose = require("mongoose");

exports.getCities = async (req, res, next) => {
  try {
    const dbCity = await City.find();
    res.status(200).json({ ...dbCity });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

exports.getCity = async (req, res, next) => {
  try {
    const dbCity = await City.find({ stateid: req.params.id });
    let data = [...dbCity];
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

exports.saveCity = async (req, res, next) => {
  req.check("cityname", "City name required").notEmpty();
  req.check("stateid", "State Id  required").notEmpty();
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
      const city = new City({
        _id: new mongoose.Types.ObjectId(),
        city_name: req.body.cityname,
        stateid: req.body.stateid
      });
      const saveDbcity = await city.save();
      res.status(201).json({ ...saveDbcity._doc });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  }
};
