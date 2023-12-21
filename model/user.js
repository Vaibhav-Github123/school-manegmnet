const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fistName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        role:{
            type:String,
            default:'student'    
        },
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Student"
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Book"
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

userSchema.virtual("students", {
    ref: "Student",
    localField: "_id",
    foreignField: "student",
  });

userSchema.virtual("books", {
    ref: "Book",
    localField: "_id",
    foreignField: "user",
  });


module.exports = mongoose.model('User', userSchema);
