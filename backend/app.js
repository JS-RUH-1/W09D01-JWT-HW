let express = require("express");
let mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParaser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
let cors = require("cors");
app = express();
const router = require("./routes/index");
app.use(express.json());
app.use(cookieParaser());
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://admin:12345@cluster0-shard-00-00.0dxd0.mongodb.net:27017,cluster0-shard-00-01.0dxd0.mongodb.net:27017,cluster0-shard-00-02.0dxd0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pey2bn-shard-0&authSource=admin&retryWrites=true&w=majority"
);
app.use(cors());
// app.use("/", router);
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smothies", requireAuth, (req, res) => res.render("smothies"));
app.use(authRoutes);

// app.get("./set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");
//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send("you got the cookies!");
// });
// app.get("./read-cookies", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.send(cookies);
// });

app.listen(8080, () => {
  console.log("App work");
});

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(
//     "mongodb://admin:12345@cluster0-shard-00-00.0dxd0.mongodb.net:27017,cluster0-shard-00-01.0dxd0.mongodb.net:27017,cluster0-shard-00-02.0dxd0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pey2bn-shard-0&authSource=admin&retryWrites=true&w=majority"
//   );
// }
// app.use(cors({ origin: "http://localhost:3000" }));
