const bcrypt = require('bcryptjs');
const User = require('../model/user');


// admin email and password in env 
const email = process.env.EMAIL;
const password = process.env.PASSWORD;


exports.seedAdmin = async() => {

    const existingAdmin = await User.findOne({ email });
    if (!existingAdmin) {
      let hashPassword = await bcrypt.hash(password, 10);

      const admin = new User({
        role:"admin",
        fistName:"admin",
        email: email,
        password: hashPassword
    });

      await admin.save();

      console.log("admin seeder succesfully");
      return;
    }else {
      console.log("admin already seeder");
    }
};
