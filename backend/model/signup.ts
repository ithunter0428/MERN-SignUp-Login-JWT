 const mongoose = require("mongoose")
//import * as mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        minlength: 3,
        maxlength:15,
        require:true
    },
    lastname:{
        type: String,
        minlength: 3,
        maxlength:15,
        require:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender : {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        min:10,
        required: true
    },
    password:{
        type:String,
        required:true
    },
})

const Register:any = new mongoose.model('Registration', userSchema)

// module.exports = Register
export default Register