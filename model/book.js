const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        bookName:{
            type:String,
            require:true
        },
        authorName:{
            type:String,
            require:true
        },
        user:[{
            "type": mongoose.Schema.Types.ObjectId,
            "ref":"User"
        }]
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Book", bookSchema);