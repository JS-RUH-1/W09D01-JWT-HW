const router = require("express").Router();
let author = require("../models/author.model");
// ======>( ROUTER FOR GET ALL AUTHORS )<======
router.get("/getAll", (req, res) => {
  author.find().then((data) => {
    res.json(data);
  });
});
// ======>( ROUTER FOR GET ALL AUTHORS )<======
router.get("/getAuthor/:id", (req, res) => {
  author.findById(req.params.id).then((data) => {
    res.json(data);
  });
});
// ======>( ROUTER FOR ADD AUTHOR )<======
router.post("/add", (req, res) => {
  author.insertMany([req.body]).then(() => {
    author.find().then((data) => {
      res.json(data);
    });
  });
});
// ======>( ROUTER FOR EDIT AUTHOR )<======
router.put("/edit/:id", (req, res) => {
  author.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.send("UPDATED!!");
  });
});
// ======>( ROUTER FOR DELETE AUTHOR )<======
router.delete("/delete/:id", (req, res) => {
  author.findByIdAndDelete(req.params.id).then(() => {
    author.find().then((data) => res.send(data));
  });
});

module.exports = router;
