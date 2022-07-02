const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minLength:4,
        maxLength:20,
    },
    gender:{
        type: String,
        required:false,
        enum: ['male', 'female'],
        default: "male"
    },
    birthday:{
        type:Date,
        required:false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength:30,
    },
    password:{
        type: String,
        required: true,
        minLength:6,
    },
    profilePicture:{
        type: String,
        required:false,
        default: '',
    },
    isAdmin:{
        type: Boolean,
        default:false
    }

},{
    timestamps:true,
    versionKey:false
})

const User=mongoose.model("User",userSchema)

module.exports = User;
