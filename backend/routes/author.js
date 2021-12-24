const router = require("express").Router(),
  AuthorController = require("../controllers/author");

router.get("/", AuthorController.index);
router.get("/:aid", AuthorController.show);
router.put("/:aid/update", AuthorController.update);
router.delete("/:aid/delete", AuthorController.delete);
router.post("/create", AuthorController.create);
module.exports = router;
