const Student = require('../model/student');

exports.getAddDetails = async(req, res) => {
    res.render("add-student-details")
}

exports.addDetails = async(req, res) => {
    try {
        const newDetails = new Student({
          std: req.body.std,
          div: req.body.div,
        });

        await newDetails.save();

        return res.redirect("/addDetails");

    } catch (error) {
        return res.render("500");
    };
};

exports.AllStudent = async(req, res) => {
    res.render("all-students")
}

exports.getAllStudent = async(req, res) => {
    try {
        const students = await Student.find().populate({
            path: "student",
            model: "User",
        })

        return res.status(200).json({
            success:true,
            data:students,
            message:"All students found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.getStudentById = async(req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        return res.status(200).json({
            success:true,
            data:student,
            message:"student found Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.updateStudentById = async(req, res) => {
    try {
        const id = req.params.id;
        const { std, div } = req.body;

        const student = await Student.findByIdAndUpdate(id);

        student.std = std;
        student.div = div;
        
        return res.status(200).json({
            success:true,
            data:student,
            message:"Student updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.deleteStudentById = async(req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            data:student,
            message:"Student deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};