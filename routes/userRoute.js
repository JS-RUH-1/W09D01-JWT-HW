const router = require("express").Router();
let user = require("../models/user.model");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
// =====>(ROUTER FOR ADD NEW USER )<=====
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  user
    .insertMany([{ name: name, email: email, password: passwordHash }])
    .then(() => {
      res.send("The user is added");
    })
    .catch((err) => {
      console.log(err);
    });
});

// =====>(ROUTER FOR CHECK USER )<=====
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let u = await user.findOne({ email: email }).lean();
  if (u == null) res.send("invalid email/password");
  if (await bcrypt.compare(password, u.password)) {
    let user = jwt.sign(u, "test secret");
    res.json(user);
  } else res.send("invalid email/password");
});
module.exports = router;
