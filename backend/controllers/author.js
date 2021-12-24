const Author = require("../models/author");
let mongoose = require("mongoose");

module.exports = {
  index: (req, res) => {
    Author.find({})
      .then((authors) => {
        res.send(authors);
      })
      .catch((error) => {
        res.send({ error: error });
      });
  },

  show: (req, res) => {
    let authorId = req.params.aid;
    Author.findById(authorId)
      .then((author) => {
        res.send({ author });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  update: (req, res) => {
    let authorId = req.params.aid;
    let authorInfo = {
      name: req.body.name,
      age: req.body.age,
      nationality: req.body.nationality,
      image: req.body.image,
      gender: req.body.gender,
      books: req.body.books,
    };
    Author.findByIdAndUpdate(authorId, { $set: authorInfo })
      .then((author) => {
        res.send({ message: "Author information has been updated" });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  delete: (req, res) => {
    let authorId = req.params.aid;
    Author.findByIdAndRemove(authorId)
      .then(() => {
        res.send({ message: "Author is deleted" });
      })
      .catch((error) => {
        res.send({ error: erorr });
      });
  },

  create: (req, res) => {
    let author = new Author({
      name: req.body.name,
      age: req.body.age,
      nationality: req.body.nationality,
      image: req.body.image,
      gender: req.body.gender,
      books: req.body.books,
    });
    author.save((error) => {
      if (error) res.send({ erorr: erorr });
      else res.send({ message: "Author is inserted" });
    });
  },
};
