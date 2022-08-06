require('dotenv').config()
import express from 'express';
require("./db/connection")
import dbConnection from './db/connection';
const app = express()
import router from './Routes/routes';
import bodyParser from "body-parser"
import response from './response/response';

dbConnection()

//constants
const port = 4001

// middleware
// app.use(express.json())
app.use(response);
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
    next();
});

// route
app.use(router)


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})