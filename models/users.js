const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})

const users = mongoose.model("Users",Schema)

module.exports = {
    users,
    mongoose,
}




