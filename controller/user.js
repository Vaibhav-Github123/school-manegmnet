const User = require('../model/user');


exports.getAllUser = async(req, res) => {
    try {
        const users = await User.find().populate({ path: 'students', model: 'Students' }).
        populate({ path: 'books', model: 'Book' });

        return res.status(200).json({
            success:true,
            data:users,
            message:"All users found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.getUserById = async(req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id).populate("students");

        return res.status(200).json({
            success:true,
            data:user,
            message:"User found Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.updateUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const {fistName, lastName, subject, email } = req.body;

        const user = await User.findByIdAndUpdate(id);
        
        user.fistName = fistName,
        user.lastName = lastName,
        user.subject = subject,
        user.email = email

        return res.status(200).json({
            success:true,
            data:user,
            message:"User updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.deleteUserById = async(req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            data:user,
            message:"User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};
