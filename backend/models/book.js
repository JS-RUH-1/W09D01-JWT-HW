const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  pages: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("book", bookSchema);
