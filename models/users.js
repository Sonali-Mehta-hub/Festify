const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema =  new Schema({
    email:{
        type:String,
        required:true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    displayName: {
        type: String
    },
    image: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);