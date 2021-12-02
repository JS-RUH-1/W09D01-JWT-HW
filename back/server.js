const express = require("express");
const cors = require("cors");
const posts = require("./routes/author");
const books = require("./routes/book");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

mongoose.connect(
  "mongodb+srv://123:123@cluster0.ieg5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routers

app.use("/", posts);
app.use("/books", books);

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});