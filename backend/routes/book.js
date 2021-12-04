const router = require("express").Router(),
  BookController = require("../controllers/book");

router.get("/", BookController.index);
router.get("/:bookid", BookController.show);
router.put("/:bookid/update", BookController.update);
router.delete("/:bookid/delete", BookController.delete);
router.post("/create", BookController.create);

module.exports = router;
