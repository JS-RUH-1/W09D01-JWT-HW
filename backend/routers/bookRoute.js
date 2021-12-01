const express = require("express");
const router = express.Router();
let books = require("../models/book");

router.get("/", (req, res) => {
  books
    .find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/bookbyid/:id", (req, res) => {
  books
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/updatebook/:id", (req, res) => {
  books.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) console.log(err);
    res.json("Book updated!");
  });
});
router.post("/addBook", (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const pages = req.body.pages;
  const image = req.body.image;
  let newBook = new books({ title, price, pages, image });
  newBook
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



router.delete("/deletebook/:id", (req, res) => {
  books
    .findByIdAndDelete(req.params.id)
    .then(() => {
      books
        .find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
