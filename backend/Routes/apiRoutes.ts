import {Request , Response} from "express"
import controller from "../app/controller/controller"
import { Router } from 'express';
const usersRouter = Router();

//Routes
usersRouter.post("/signup",controller.signup)


export default usersRouter;


