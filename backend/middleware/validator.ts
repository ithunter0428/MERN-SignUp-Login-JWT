const Joi = require("joi")
const bcrypt = require("bcryptjs")
import response from "../response/resp"

const validator = async (req:any,res:any,next:any) => {
    // console.log('Validator Data', req.body)
    const resgisrationSchema = Joi.object({
        firstname: Joi.string().min(3).max(15).required(),
        lastname:Joi.string().min(3).max(15).required(),
        email: Joi.string().email({tlds: { allow: ['com', 'net'] } }).required(),
        gender : Joi.string().required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().required(),
        confirmpassword:Joi.ref('password')
    })
    try{
        const value = await resgisrationSchema.validateAsync(req.body) 
        console.log(value,"::::::::::::::::::::::::::::::::::")
        //hasing in password.....
        const hash  = await bcrypt.hash(value.password,10)
        //overridung request body object......
        req.body = {
            firstname: value.firstname,
            lastname: value.lastname,
            email: value.email,
            gender : value.gender,
            phone: value.phone,
            password:hash
            // confirmpassword: hash
        }
        if(!value){
            response.error(res,{success:true,message:"You have not entered all field correctly"})
        }
        next()
    }
    catch(err){
        response.error(res,{success:true,message:"You have not entered all field correctly"})
    }
    
}

export default validator
// module.exports = validator