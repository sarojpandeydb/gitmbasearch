const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  btitle: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User" },
  categoryid: { type: Schema.Types.ObjectId, ref: "Category" },
  subctid: { type: Schema.Types.ObjectId, ref: "SubCategory" },
  baddress: { type: String, required: true },
  bcountry: { type: String, required: true },
  bstate: { type: String, required: true },
  bcity: { type: String, required: true },
  bemail: { type: String, required: true },
  bphone: { type: String, required: true },
  burl: { type: String, default: null },
  images: { type: Array, required: true },
  price: { type: String, default: null },
  description: { type: String, default: null },
  created_ts: { type: String, default: Date.now },
  updated_ts: { type: String, default: null }
});
module.exports = mongoose.model("Post", postSchema);
