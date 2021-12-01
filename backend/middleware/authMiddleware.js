const jwt = require("jsonwebtoken");
const Author = require("../models/author");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, "!@*#FASFJ(#!_$!4", (err, decodedToken) => {
      if (err) {
        console.log(err.meassage);
        res.redirect("/signin");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/signin");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "!@*#FASFJ(#!_$!4", async (err, decodedToken) => {
      if (err) {
        res.locals.author = null;
        next();
      } else {
        let author = await Author.findById(decodedToken.id);
        res.locals.author = author;
        next();
      }
    });
  } else {
    res.locals.author = null;
    next();
  }
};
module.exports = { requireAuth, checkUser };
