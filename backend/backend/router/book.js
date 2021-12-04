const router = require('express').Router();
let BookSchema = require('../schema/Book');
const mongoose = require("mongoose");
const Book = mongoose.model('Book', BookSchema);
const seedBook = require("../seed.js/book_seed")



router.get("/", (req, res) => {
    Book.find({}, (err, books) => {
      res.send(books)
    }); 

//       =========>dont opint a gine <=============

    // Book.insertMany(seedBook, (err, books) => {
    //     if (err){ console.log(err)}
    //       console.log("added provided books data", books)
    //      });
  });
  //in the req he gonin to create a new book
  router.post("/", (req, res) =>{
    Book.create(req.body, function(err , res){
    if(err) return (err);
    });
    // try to use json instead of send if it work
    res.send("done i save it")
  });

  router.put("/", (req, res) => {
    Book.findOneAndUpdate({ title: req.body.title },
    { 
      price: req.body.price, 
      pages: req.body.pages,
      image: req.body.image
  
    }, () => {
        console.log('updated')
    }); 
    // do not forgot the res send a gain
    // لا تنسي res send تاني 
    res.send("done")
  });
 
  router.delete("/", (req, res) => {
    Book.deleteMany({ title: req.body.title}, () => {
    console.log('deleted')
  }); 
    res.send('deleted!')
  });


module.exports =router;