const router = require("express").Router();
let book = require("../models/book.modul");

// ======>( ROUTER FOR GET ALL AUTHOR )<======
router.get("/getAll", (req, res) => {
  book.find().then((data) => res.json(data));
});

// ======>( ROUTER FOR GET ONE AUTHOR )<======
router.get("/getBook/:id", (req, res) => {
  book.findById(req.params.id).then((data) => {
    res.json(data);
  });
});

// ======>( ROUTER FOR EDIT AUTHOR )<======
router.put("/edit/:id", (req, res) => {
  book.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send("UPDATED!!");
  });
});

// ======>( ROUTER FOR DELETE AUTHOR )<======
router.delete("/delete/:id", (req, res) => {
  book.findByIdAndDelete(req.params.id).then(() => {
    book.find().then((data) => res.send(data));
  });
});

// ======>( ROUTER FOR ADD AUTHOR )<======
router.post("/add", (req, res) => {
  book.insertMany([req.body]).then(() => {
    book.find().then((data) => res.json(data));
  });
});

module.exports = router;
