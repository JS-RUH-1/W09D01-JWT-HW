const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, default: 0 },
  image: { type: String, required: true },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
