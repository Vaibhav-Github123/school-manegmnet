const express = require("express");
const router = express.Router();

const bookController = require("../controller/book");

router.post("/addBook",bookController.addBook);
router.get("/allBook",bookController.getAllBook);
router.get("/getBookById/:id",bookController.getBookById);
router.put("/updateBookById/:id",bookController.updateBookById);
router.delete("/deleteBookById/:id",bookController.deleteBookById);

module.exports = router;