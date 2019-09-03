const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User" },
  images: { type: Array, required: true },
  price: { type: String, default: null },
  price_oncall: {
    type: Boolean,
    default: false
  },
  description: { type: String, default: null },
  categoryid: { type: Schema.Types.ObjectId, ref: "Category" },
  created_ts: { type: String, default: Date.now },
  updated_ts: { type: String, default: null }
});
module.exports = mongoose.model("Post", postSchema);
   