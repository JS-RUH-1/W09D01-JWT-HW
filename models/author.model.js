const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: false },
    nationality: { type: String, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: false },
    books: { type: Array, required: false },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
