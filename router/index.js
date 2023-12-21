const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const student = require("./student");
const book = require("./book");

const jwtAuth = require("../middleware/auth");

router.use("/",auth);
router.use("/user",(jwtAuth(["admin"])),user);
router.use("/", student);
router.use("/book",(jwtAuth(["admin", "student"])),book)


module.exports = router;