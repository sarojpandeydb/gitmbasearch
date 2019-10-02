const Category = require("../../api/models/category.model");
const SubCategory = require("../../api/models/sub.category.model");
const Countries = require("../../api/models/country.model");
const Post = require("../../api/models/postads.model");
const User = require("../../api/models/user.model");
const City = require("../../api/models/city.model");
const State = require("../../api/models/state.model");

exports.categories = async() => {
    try {
        const dbcats = await Category.find();
        return [...dbcats];
    } catch (e) {
        return e.message;
    }
};

exports.countries = async() => {
    try {
        const dbCountry = await Countries.find();
        return [...dbCountry];
    } catch (e) {
        return e.message;
    }
};

exports.getUserPosts = async userid => {
    try {
        const dbPostAds = await Post.find({ userid: userid }).populate({
            path: "categoryid",
            model: Category,
            select: "c_name"
        });
        const data = [...dbPostAds];
        return {
            posts: await Promise.all(
                data.map(async doc => {
                    return {
                        ...doc._doc,
                        images: doc.images.map(pic => {
                            return { filename: pic.filename };
                        }),
                        description: doc.description,
                        btitle: doc.btitle,
                        c_name: doc.categoryid.c_name,
                        price: doc.price
                    };
                })
            )
        };
    } catch (e) {
        return e.message;
    }
};

exports.getPosts = async() => {
    try {
        const dbPostAds = await Post.find()
            .populate({
                path: "categoryid",
                model: Category,
                select: "c_name"
            })
            .sort({ created_ts: -1 });
        const data = [...dbPostAds];
        return {
            posts: await Promise.all(
                data.map(async doc => {
                    return {
                        ...doc._doc,
                        images: doc.images.map(pic => {
                            return { filename: pic.filename };
                        }),
                        description: doc.description,
                        btitle: doc.btitle,
                        c_name: doc.categoryid.c_name,
                        price: doc.price
                    };
                })
            )
        };
    } catch (e) {
        return e.message;
    }
};

exports.getLatestFewerPosts = async() => {
    try {
        const dbPostAds = await Post.find()
            .populate({
                path: "categoryid",
                model: Category,
                select: "c_name"
            })
            .populate({
                path: "subctid",
                model: SubCategory,
                select: "subcatname category",
                populate: {
                    path: "category",
                    model: Category,
                    select: "c_name"
                }
            })
            .populate({
                path: "userid",
                model: User,
                select: "name"
            })
            .populate({
                path: "bstate",
                model: State,
                select: "state_name"
            })
            .populate({
                path: "bcity",
                model: City,
                select: "city_name"
            })
            .sort({ created_ts: -1 })
            .limit(6);
        const data = [...dbPostAds];
        return {
            posts: await Promise.all(
                data.map(async doc => {
                    return {
                        ...doc._doc,
                        images: doc.images.map(pic => {
                            return { filename: pic.filename };
                        }),
                        description: doc.description,
                        btitle: doc.btitle,
                        c_name: doc.categoryid.c_name,
                        price: doc.price
                    };
                })
            )
        };
    } catch (e) {
        return e.message;
    }
};

exports.getPostDetails = async id => {
    try {
        const dbPostAds = await Post.find({ _id: id })
            .populate({
                path: "categoryid",
                model: Category,
                select: "c_name"
            })
            .populate({
                path: "subctid",
                model: SubCategory,
                select: "subcatname category",
                populate: {
                    path: "category",
                    model: Category,
                    select: "c_name"
                }
            })
            .populate({
                path: "userid",
                model: User,
                select: "name"
            })
            .populate({
                path: "bstate",
                model: State,
                select: "state_name"
            })
            .populate({
                path: "bcity",
                model: City,
                select: "city_name"
            })
            .sort({ created_ts: -1 });
        const data = [...dbPostAds];
        return {
            posts: await Promise.all(
                data.map(async doc => {
                    return {
                        ...doc._doc,
                        images: doc.images.map(pic => {
                            return { filename: pic.filename };
                        }),
                        description: doc.description,
                        btitle: doc.btitle,
                        c_name: doc.categoryid.c_name,
                        price: doc.price
                    };
                })
            )
        };
    } catch (e) {
        return e.message;
    }
};