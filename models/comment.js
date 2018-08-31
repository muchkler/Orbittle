var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id:{
            createdAt: {type:Date, default:Date.now},
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});



module.exports = mongoose.model("Comment", commentSchema);