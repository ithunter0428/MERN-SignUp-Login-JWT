var jwt = require('jsonwebtoken');
import express from 'express'
let token:any
const jwttoken = async (req:express.Request,res:express.Response,next:any) =>{
   let  {email} = req.body
    const accessToken = await jwt.sign({email:email},process.env.ACCESS_SECRET)
    req.body.token = accessToken
    // console.log("hello",req.body)
    next()
}

export default jwttoken