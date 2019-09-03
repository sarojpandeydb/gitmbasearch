const Category = require("../../api/models/category.model");


exports.categories = async ()=>{
    try {
        const dbcats = await Category.find();        
        return {...dbcats};
    } catch (e) {
        return e.message
    }
}