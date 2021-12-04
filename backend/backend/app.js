const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const app = express()
const Book = require("../backend/router/book")
const Authors = require("../backend/router/author")
const user = require("./router/user")
app.use(express.json());


    

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
app.use(cors({origin: 'http://localhost:3000'}))


app.use("/api/book", Book);
const seedBook = require("./seed.js/book_seed");
app.use('/api/author', Authors)
const seedAuthor =require("../backend/seed.js/author_seed")
app.use('/user', user)
// app.get('/', (req,res)=>{
//     res.json({message: "hi ddd"})
// })

app.listen(3002, () =>{
    console.log("hi  i worked b");
})