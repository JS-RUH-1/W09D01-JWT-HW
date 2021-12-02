const express = require("express");
const router = express.Router();
const Books = require("../book");
const authors = require("../author");
const jwt = require("jsonwebtoken");

// get all posts
router.get("/", async (req, res) => {
  const allBooks = await Books.find();
  res.json(allBooks);
});

// add new post
router.post("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;

    if (id) {
      const post = new Books({
        ...req.body,
      });
      await post.save();
    }

    return res.send(post);
  } catch (error) {
    return res.json({ status: "error", error: "invalid token" });
  }

  // Send response in here
});

// update post

router.put("/:id", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;

    if (id) {
      let book = await Books.findOneAndUpdate(
        { title: req.params.id },
        { ...req.body }
      );
      console.log("this is title", book);
    }
    return res.status(204).send();
  } catch (err) {
    console.log("error happend");
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  console.log("this is book");

  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;

    console.log("this is id", id);
    if (id) {
      let book = await Books.findOneAndRemove({ title: req.params.id });
      console.log("this is title", book);
    }
    return res.status(204).send();
  } catch (err) {
    console.log("error happend");
  }
});

module.exports = router;
