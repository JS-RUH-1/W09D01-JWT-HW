const { Schema, model } = require("mongoose");
const Book = require("./book")
// Author Schema

module.exports = model(
  "Author",
  new Schema({
    name: {
      type: String,
      required: [true, "Please add name for the author"],
    },
    age: Number,
    nationality: {
      type: String,
      required: [true, "Please add nationality for the author"],
    },
    username:{

      type:String,
      unique:true,
      required: [true, "Please add username "],


    },
    password:{
      minlength:6,
      type:String,
      required: [true, "Please add password "],


    },
    image: {
      type: String,
      required: [true, "Please add image for the author"],
    },
    gender: String,
    books: [Book.schema],
  })
);
