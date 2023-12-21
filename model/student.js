const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {
        std:{
            type:Number,
            require:true
        },
        div:{
            type:String,
            require:true
        },
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
);


module.exports = mongoose.model('Student', studentSchema);
