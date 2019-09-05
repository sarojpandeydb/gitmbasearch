const Category = require("../../api/models/category.model");
const Countries = require("../../api/models/country.model");
const Post = require("../../api/models/postads.model");

exports.categories = async () => {
  try {
    const dbcats = await Category.find();
    return [...dbcats];
  } catch (e) {
    return e.message;
  }
};

exports.countries = async () => {
  try {
    const dbCountry = await Countries.find();
    return [...dbCountry];
  } catch (e) {
    return e.message;
  }
};

exports.getPosts = async userid => {
  try {
    const dbPostAds = await Post.find({ userid: userid });
    return [...dbPostAds];
  } catch (e) {
    return e.message;
  }
};
