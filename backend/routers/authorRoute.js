const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let authors = require("../models/author");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  //first par is the payLoad (data) and the secon is the secrt and it should be hidden
  //the third one is for the option :expiresIn used for make expire date for the web token
  return jwt.sign({ id }, "!@*#FASFJ(#!_$!4", { expiresIn: maxAge });
};
//hundle errors
const hundleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email login
  if (err.message === "incorrect email") {
    errors.email = "that email is not registerd";
  }

  //incorrect password login
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registerd";
    return errors;
  }
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

router.get("/", (req, res) => {
  authors
    .find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/authorbyid/:id", (req, res) => {
  authors
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addauthor", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const nationality = req.body.nationality;
  const image = req.body.image;
  const gender = req.body.gender;
  const books = req.body.books;
  const email = req.body.email;
  const password = req.body.password;

  const newAuthor = new authors({
    name,
    age,
    nationality,
    image,
    gender,
    books,
    email,
    password,
  });
  newAuthor
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/updateauthor/:id", (req, res) => {
  authors.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) console.log(err);
    res.json("Author updated!");
  });
});

router.delete("/deleteauthor/:id", (req, res) => {
  authors
    .findByIdAndDelete(req.params.id)
    .then(() => {
      authors
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

router.post("/signup", async (req, res) => {
  const { email, password, name, nationality, image } = req.body;
  try {
    const author = await authors.create({
      email,
      password,
      name,
      nationality,
      image,
    });
    const token = createToken(author._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ author: author._id });
  } catch (err) {
    const errors = hundleErrors(err);
    res.status(400).json({ errors });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const author = await authors.login(email, password);
    const token = createToken(author._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ author: author._id });
  } catch (err) {
    const errors = hundleErrors(err);
    res.status(400).json({ errors });
  }
});
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/"); //because it never stops
  res.end();
});

module.exports = router;
