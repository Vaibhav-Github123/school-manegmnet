const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/allUser",userController.getAllUser);
router.get("/getUserById/:id",userController.getUserById);
router.put("/updateUserById/:id",userController.updateUserById);
router.delete("/deleteUserById/:id",userController.deleteUserById);


module.exports = router;