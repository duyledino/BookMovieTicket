import express from "express";
import { getAllUser,createAUser,deleteAUser,updateAUser,loginUser,logoutUser } from "../controller/UserController.js";
import {authenticateUser,authticateAdmin} from '../middleware/authentication.js';
import asyncHandler from '../middleware/asyncHandler.js'

const route = express.Router();

const initCustomerRouter = (app)=>{
    route.get("/getAllUser",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(getAllUser));
    route.post("/createUser",asyncHandler(createAUser));
    route.put("/updateUser/:id",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(updateAUser));
    route.delete("/deleteUser/:id",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(deleteAUser));
    route.post("/login",asyncHandler(loginUser));
    route.post("/logout",asyncHandler(logoutUser));
    return app.use("/api/v1/user",route);
}

export default initCustomerRouter;