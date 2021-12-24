const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please inserte valid email"],
  },
  password: {
    type: String,
    required: [true, "enter password"],
    minlength: [6, "minimmum 5 caracter"],
  },
});

userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

userSchema.pre("save", async function (next) {
  console.log("user about to be created & saved");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("incorrect passowrd");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
