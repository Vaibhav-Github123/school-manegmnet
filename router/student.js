const express = require("express");
const router = express.Router();

const studentController = require("../controller/student");

router.get("/addDetails",studentController.getAddDetails);
router.post("/addStudentDetails",studentController.addDetails);

router.get("/getAllStudent",studentController.AllStudent);
router.post("/allStudent",studentController.getAllStudent);


router.post("/getStudentById/:id",studentController.getStudentById);


router.post("/updateStudentById/:id",studentController.updateStudentById);


router.post("/deleteStudentById/:id",studentController.deleteStudentById);

module.exports = router;