import express from "express";
import { getAllUser,createAUser,deleteAUser,updateAUserByAdmin,loginUser,logoutUser,getNumberOfUserByMonth, getAUser, updateProfile } from "../controller/UserController.js";
import {authenticateUser,authenticateAdmin} from '../middleware/authentication.js';
import asyncHandler from '../middleware/asyncHandler.js'

const route = express.Router();

const initCustomerRouter = (app)=>{
    route.get("/getAUser",authenticateUser,asyncHandler(getAUser));
    route.patch("/updateProfile",authenticateUser,asyncHandler(updateProfile))
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.get("/getAllUser",authenticateUser,authenticateAdmin,asyncHandler(getAllUser));
    route.get("/getCountUser",authenticateUser,authenticateAdmin,asyncHandler(getNumberOfUserByMonth));
    route.post("/createUser",asyncHandler(createAUser));
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.patch("/updateUser/:id",authenticateUser,authenticateAdmin,asyncHandler(updateAUserByAdmin));
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.delete("/deleteUser/:id",authenticateUser,authenticateAdmin,asyncHandler(deleteAUser));
    route.post("/login",asyncHandler(loginUser));
    route.post("/logout",asyncHandler(logoutUser));
    return app.use("/api/v1/user",route);
}

export default initCustomerRouter;