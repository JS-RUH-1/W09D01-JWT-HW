const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookSchema = require("./book");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

let AuthorSchema = new Schema({
  name: { type: String, required: [true, "Author name should be provided"] },
  age: Number,
  nationality: {
    type: String,
    required: [true, "Author nationality should be provided"],
  },
  image: {
    type: String,
    required: [true, "Author image should be provided"],
  },
  gender: String,
  books: Array,
  email: {
    type: String,
    required: [true, "email should be provided"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "isInvalid"],
  },
  password: {
    type: String,
    minlength: [8, "minemum password length is 8"],
    required: [true, "password should be provided"],
  },
});


//fire a function after doc saved to db

AuthorSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

//fire a function before doc saved to db

AuthorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method for login user
AuthorSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    //then next line will hash the first parameter then compare it eith the one in the db
    //return T or F
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

//first parameter is the name for the db collection
const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
