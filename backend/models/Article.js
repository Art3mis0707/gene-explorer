// models/Article.js
const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  link: { type: String, required: true },
  // Add any additional fields if needed, for example:
  // author: { type: String },
  // date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Article", ArticleSchema);
