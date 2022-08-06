import express from 'express'
import Register from "../model/signup";
import responseMessage from '../constant/responseMessage';
const bcrypt = require("bcryptjs")

const login = async(req:express.Request,res:any) =>{
    try{
        let  emailExist = await Register.findOne({email:{$eq:req.body.email}})
        // console.log(emailExist)
        if(emailExist !== null){
            let passwordMatch:boolean = await bcrypt.compare(req.body.password,emailExist.password)
            let accessToken:string = req.body.token
            if(passwordMatch){
                res.success(responseMessage.SUCCESSMSG.LOGIN,{token:accessToken})
            }
            else{
                res.error(responseMessage.ERRORMSG.PASSWORD_NOT_MATCH)
            }
        }
        else {
            res.error(responseMessage.ERRORMSG.INVALID_EMAIL)
        }

    }catch(e){
        console.log(e)
    }
    
}

export default login