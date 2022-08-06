import express from "express"
import Register from "../model/signup"
import responseMessage from "../constant/responseMessage"
const Redis = require("redis");

// const redisClient = Redis.createClient();
// redisClient.on('connect',  () => {
//     console.log('Redis Connected!')
// })
// redisClient.on('error',  (err: any) => {
//     console.log('Redis Error!', err);
// })
// redisClient.connect()

const getUserData = async (req:any,res:any) =>{
    // console.log('Redis client testing -> ', redisClient)
    let {email} = (req.email)
    try{
        const getUser = await Register.find({email:{$eq:email}})
        if(getUser !== null){
            console.log("database called")
            // redisClient.set("userInfo",JSON.stringify(getUser), (err:any,reply:any)=>{
            //     console.log(reply)
            // })
            return res.success(responseMessage.SUCCESSMSG.DATA_FETCHED,getUser)
        }
        else{
            return res.error(responseMessage.ERRORMSG.DATA_NOT_FOUND);
        }
    }catch(e){
        console.log(e)
    }
}

const updateUserData = async (req:any, res:any) =>{
    let {email} = req.email
    const {firstname,lastname,updatedEmail,gender,phone} = req.body
    const updateUser = await Register.updateOne({email:email},{$set:{
        firstname: firstname,
        lastname: lastname,
        email: updatedEmail,
        gender: gender,
        phone: phone
      }},{new:true})
      if(updateUser.modifiedCount){
          return res.success(responseMessage.SUCCESSMSG.UPDATED_SUCCESSFULLY,{})
      }
      else{
          return res.error(responseMessage.ERRORMSG.WENT_WRONG)
      }
}

const deleteUser = async (req:any, res:any) => {
    let {email} = req.email
    const deleteUser = await Register.deleteOne({email:email})
    console.log(deleteUser)
    if(deleteUser){
        return res.success(responseMessage.SUCCESSMSG.DELETED_SUCCESSFULLY)
    }
    else{
        return res.error(responseMessage.ERRORMSG.WENT_WRONG);
        
    }
}

export default {getUserData, updateUserData, deleteUser}


