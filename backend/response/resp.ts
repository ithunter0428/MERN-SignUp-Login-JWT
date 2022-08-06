interface SuccessData {
    success: boolean
    message: string,
    data:{
        firstname: string,
        lastname: string,
        email: string,
        gender: string,
        phone: string,
        password: string,
        confirmpassword: string
    }
}
interface ErrorResponse {
    success: boolean
    message: string,
}


const success = (response:any,resData:SuccessData) =>{
    return response.status(200).send(resData)
}
const error = (response:any,resData:ErrorResponse) =>{
    return response.status(400).send(resData)
}

export default {success,error}