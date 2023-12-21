const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");

router.get("/register",authController.getRegister);
router.post("/register",authController.postRegister);

router.get("/login",authController.getLogin);
router.post("/login",authController.login);

router.get("/index",authController.getIndex);



module.exports = router;