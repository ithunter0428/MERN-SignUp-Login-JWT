// const Register = require("../models/signup")
import express from 'express'
import Register from "../model/signup";
// import response from '../response/resp';
import responseMessage from '../constant/responseMessage';

const createUser = async (req:express.Request,res:any) =>{
    console.log(req.body)
    var emailExist = await Register.findOne({email:{$eq:req.body.email}})
    var numExist = await Register.findOne({phone:{$eq:req.body.phone}})
    // console.log(emailExist,numExist)
    if(emailExist === null && numExist===null){
        try{
            if(req.body){
                const register:any= new Register(req.body)
                const addUser = await register.save()
            return res.success(responseMessage.SUCCESSMSG.SIGNUP,addUser);
            }
            else{
                console.log("hello");
                res.error(responseMessage.ERRORMSG.FILL_ALL_DETAILS)
            }
        }catch(err){
            console.log("hello")
            res.error(responseMessage.ERRORMSG.FILL_ALL_DETAILS)
        }
    }
    else{
        if(emailExist && numExist){
            res.error(responseMessage.ERRORMSG.EMAIL_AND_NUMBER_EXIST)
        }
        else if(numExist){
            res.error(responseMessage.ERRORMSG.NUMBER_EXIST)
        }
        else{
            res.error(responseMessage.ERRORMSG.EMAIL_EXIST)
        }
    }
}

export default createUser
// module.exports = {createUser}