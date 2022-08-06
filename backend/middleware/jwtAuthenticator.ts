import express from 'express'
const jwt = require("jsonwebtoken")
// import response from '../response/response'
import responseMessage from '../constant/responseMessage'

const jwtAuthenticator = (req:any,res:any,next:any) =>{
    let jwtToken = req.header('access-token')
    if(jwtToken == null){
        return res.error(responseMessage.ERRORMSG.JWT_NOT_FOUND)
    }
    jwt.verify(jwtToken,process.env.ACCESS_SECRET, (err:any,email:string)=>{
            console.log(email)
            if(err){
                return res.error("token is not valid");
            }
            else{
                req.email = email ;
                console.log(email);
                next()
            }

        })

}

export default jwtAuthenticator