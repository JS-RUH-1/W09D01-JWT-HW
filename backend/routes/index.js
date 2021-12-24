const router = require("express").Router(),
  AuthorRoutes = require("./author");
BookRoutes = require("./book");

router.use("/author", AuthorRoutes);
router.use("/book", BookRoutes);

module.exports = router;
