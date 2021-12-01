const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 3001;
const authorRoute = require("./routes/authorRoute");
const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/test");
// }
// mongoose.connect("mongodb://localhost:27017/test", {
mongoose.connect(
  "mongodb+srv://admin:adminxx@cluster0.9badp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.use("/api/author", authorRoute);
app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);
// const Book = require("./models/book.modul");
// const Author = require("./models/author.model");
// const seedBook = require("./book_seed");
// const seedAuthor = require("./author_seed");

// ==========> (INSERTING) <==========
// Book.insertMany(seedBook, (err, Books) => {
//   if (err) console.log(err);
//   console.log("added provided books data", Books);
// });
// Author.insertMany(seedAuthor, (err, Authors) => {
//   if (err) console.log(err);
//   console.log("added provided authors data", Authors);
// });

// ==========> (QUERYING) <==========
// - Add at least 2 new author and book
// Book.insertMany(
//   [
//     {
//       title: "GOT",
//       pages: 25,
//       price: 40,
//       image:
//         "https://images-na.ssl-images-amazon.com/images/I/5163N91r6lL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
//     },
//     {
//       title: "Clash of Kings",
//       pages: 150,
//       price: 137,
//       image:
//         "https://images-na.ssl-images-amazon.com/images/I/51qnLFPDazL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
//     },
//   ],
//   (err, data) => {
//     if (err) console.log(err);
//     console.log("added provided books data", data);
//   }
// );
// Author.insertMany(
//   [
//     {
//       name: "abdulmajeed",
//       age: 22,
//       nationality: "Saudi Arabia",
//       gender: "male",
//       image: "none",
//     },
//     {
//       name: "hanen",
//       age: 24,
//       nationality: "Saudi Arabia",
//       gender: "female",
//       image: "none",
//     },
//   ],
//   (err, Authors) => {
//     if (err) console.log(err);
//     console.log("added provided authors data", Authors);
//   }
// );

// // 1) Find all male authors
// Author.find({ gender: "male" }, (err, authors) => {
//   if (err) console.log(err);
//   console.log(authors);
// });

// // 2) Find all authors that age grater than 44
// Author.find({ age: { $gt: 44 } }, (err, authors) => {
//   if (err) console.log(err);
//   console.log(authors);
// });

// // 3) Find all authors in Kuwait country
// Author.find({ nationality: "Kuwait" }, (err, authors) => {
//   if (err) console.log(err);
//   console.log(authors);
// });

// // 4) Find all the books that start with L or l
// Book.find({ title: /^[l]+/i }, (err, data) => {
//   console.log(data);
// });

// // 5) Find all the books that have pages more than 250
// Book.find({ pages: { $gt: 250 } }, (err, data) => {
//   console.log(data);
// });

// // ==========> (Select with OR, AND) <==========
// // a) Find all authors that in Kuwait or Saudi Arabia
// Author.find(
//   { $or: [{ nationality: "Kuwait" }, { nationality: "Saudi Arabia" }] },
//   (err, data) => {
//     if (err) console.log(err);
//     console.log(data);
//   }
// );

// // b) Find all authors that have 3 books or more and their age grater than 35
// Author.find({ books: { $size: { $gt: 3 } }, age: { $gt: 35 } }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

// // ==========> (Select by exists or does not exist) <==========
// // a) do not have a key of age
// Author.find({ age: { $exists: false } }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

// // ==========> (Negative Selection) <==========
// // a) are not from Saudi Arabia
// Author.find({ nationality: { $ne: "Saudi Arabia" } }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

// // ==========> (Update) <==========
// // a) Update Osama Al Muslim age to be 45
// Author.updateOne({ name: "Osama Al Muslim" }, { age: 45 }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });
// // ==========> (Update) <==========
// // a) Remove all book that have price less than 50
// Book.deleteMany({ price: { $lt: 50 } }, (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
// });

app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});
