const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getRegister = async(req, res) => {
    
    res.render("register")
}

exports.postRegister = async(req, res) => {
    try {
        const {fistName, lastName, email, password } = req.body;

        if(!fistName || !lastName || !email || !password){
            return res.redirect("/register");
        };

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.redirect("/register");
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fistName: fistName,
            lastName: lastName,
            email: email,
            password: hashPassword,
        });

        await jwt.sign({ email }, process.env.SECRET_KEY,{
            expiresIn:"12hr"
        });

        await newUser.save();

        return res.redirect("/login");

    } catch (error) {
        return res.render("500");
    };
};

exports.getLogin = async(req, res) => {
    
    res.render("login")
}

exports.login = async(req, res) => {
    try {
        const { email,password } = req.body;

        const existingUser = await User.findOne({ email });
        if(!existingUser){
           return res.render("404");
        }; 

        const valid = await bcrypt.compare(password, existingUser.password);
        if(!valid){
            return res.redirect("/login");
        };

        await jwt.sign({ email }, process.env.SECRET_KEY,{
            expiresIn:"12hr"
        });

        return res.redirect("/index");

    } catch (error) {
        return res.render("500");
    };
};

exports.getIndex = async(req, res) => {
    
    res.render("index")
};