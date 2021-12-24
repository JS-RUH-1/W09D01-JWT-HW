const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  nationality: String,
  image: String,
  gender: String,
  books: Array,
});

module.exports = mongoose.model("author", authorSchema);
