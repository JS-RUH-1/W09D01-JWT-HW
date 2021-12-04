const Book = require("../models/book");
let mongoose = require("mongoose");

module.exports = {
  index: (req, res) => {
    Book.find({})
      .then((books) => {
        res.send(books);
      })
      .catch((error) => {
        res.send({ error: error });
      });
  },

  show: (req, res) => {
    let bookId = req.params.bookid;
    Book.findById(bookId)
      .then((book) => {
        res.send({ book });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  update: (req, res) => {
    let bookId = req.params.bookid;
    let bookInfo = {
      title: req.body.title,
      pages: req.body.pages,
      price: req.body.price,
      image: req.body.image,
    };
    Book.findByIdAndUpdate(bookId, { $set: bookInfo })
      .then((book) => {
        res.send({ message: "Book information has been updated" });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  delete: (req, res) => {
    let bookId = req.params.bookid;
    Book.findByIdAndRemove(bookId)
      .then(() => {
        res.send({ message: "Book is deleted" });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  create: (req, res) => {
    let book = new Book({
      title: req.data.title,
      pages: req.data.pages,
      price: req.data.price,
      image: req.data.image,
    });
    book.save((error) => {
      if (error) res.send({ erorr: erorr });
      else res.send({ message: "Book is inserted" });
    });
  },
};
