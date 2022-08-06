const mongoose = require('mongoose')
// import mongoose from "mongoose"

const dbConnection = () =>{
    mongoose.connect('mongodb://localhost:27017/users', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    })
    .then(()=>{
        console.log("connection successfull")
    })
    .catch((err:any)=>{
        console.log(err)
    });
}

export default dbConnection