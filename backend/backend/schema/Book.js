const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title:{
      type: String,
      required: [true, 'Book title should be provided']
    },
    image: {
      type: String,
      required: [true, 'Book image should be provided']
    },
    price: Number,
    pages: {
      type: Number,
      required: [true, 'Book pages should be provided']
    },
    author:{
      required: true,
      type:mongoose.Schema.Types.ObjectId,
      ref:'Author'
    }
  });