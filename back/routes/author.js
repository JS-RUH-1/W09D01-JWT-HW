const express = require("express");
const router = express.Router();
const authors = require("../author");
const jwt = require("jsonwebtoken");

// get all posts
router.get("/", async (req, res) => {
  const allAuthors = await authors.find({}, { username: 0, password: 0 });
  res.json(allAuthors);
});

//regiister
router.post("/", async (req, res) => {
  const post = new authors({
    ...req.body,
  });
  try {
    const token = jwt.sign(
      {
        name: req.body.username,
        id: post._id,
      },
      "secret"
    );
    await post.save();
    res.json({ status: "ok", data: token });
  } catch (err) {
    res.json("errpr");
  }
});

//find author info
router.get("/author", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const name = decoded.name;
    const user = await authors.findOne({ username: name });

    return res.json({
      status: "ok",
      user: [
        user._id,
        user.name,
        user.age,
        user.nationality,
        user.gender,
        user.image,
        user.books,
      ],
    });
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await authors.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          name: user.username,
          id: user._id,
        },

        "secret"
      );

      res.json({ status: "ok", data: token });
    } else {
      res.json("no user");
    }
  } catch (err) {
    res.json("errpr");
  }
});

//edit books
router.put("/:id", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    const user = await authors.findOne({ _id: id });
    let books = user.books;
    let book_index = user.books.findIndex(
      (b) => String(b._id) === req.params.id
    );

    books[book_index] = { ...books[book_index], ...req.body };
    let resu = await authors.updateOne({ _id: id }, { $set: { books } });

    return res.status(204).send();
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
  res.status(204).send();
});

// Add new Book
router.put("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;

    const user = await authors.findByIdAndUpdate(id, {
      ...req.body,
    });

    return res.json({
      status: "ok",
      user: [
        user._id,
        user.name,
        user.age,
        user.nationality,
        user.gender,
        user.image,
        user.books,
      ],
    });
  } catch (error) {
    return res.json({ status: "error", error: "invalid token" });
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    await authors.findByIdAndUpdate(id, {
      $pull: {
        books: {
          _id: req.params.id,
        },
      },
    });

    return res.status(204).send();
  } catch (error) {
    return res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
