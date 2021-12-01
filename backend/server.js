const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const cookieParser = require("cookie-parser");

const authorsRouter = require("./routers/authorRoute");
const booksRouter = require("./routers/bookRoute");
// const Book = require("./models/book");
// const Author = require("./models/author");
// const seedBook = require("./book_seed");
// const seedAuthor = require("./author_seed");

require("dotenv").config();
// Mongoose Here
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// msg when connect

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// connect frontend
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.get("*", checkUser);
// app.get("/", (req, res) => res.render("HomePage"));
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});
