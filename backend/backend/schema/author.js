const mongoose = require('mongoose');
const { isEmail } = require("validator");
const booksSchema= require("./Book")
module.exports =  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Author name should be provided']
    },
    nationality: {
      type: String,
      // required: [true, 'Author nationality should be provided']
    },
    image: {
      type: String,
      // required: [true, 'Author image should be provided']
    },
 
    email: {
      type: String,
      required: [true, 'Author email should be provided'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'is invalid']
    },
    password: {
      type: String,
      required: [true, 'Author password should be provided'],
      minlength: [6, 'pass more than 6 digits']
      },
    gender: String ,
    age: Number,
  books: [booksSchema]
  },
  );