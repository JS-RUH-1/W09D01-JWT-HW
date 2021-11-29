const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth")
const bookRouter = require("./routes/books")
const multer = require("multer")
const path = require("path")
const PORT = process.env.PORT || 5000


dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))


mongoose.connect(process.env.MANGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
    .then(console.log("Connect to MongoDB"))
    .catch((err) => console.log(err));



const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})


const upload = multer({ storage: imgStorage})

app.post("/api/upload", upload.single("file"), (req, res, next) => {
    res.status(200).json("File has been uploaded")
})



app.use("/api/auth/", authRouter)
app.use("/api/books/", bookRouter)


app.listen(PORT, () => {
    console.log("server is running")
})