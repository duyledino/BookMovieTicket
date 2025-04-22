import express from "express";
import { getAllUser,createAUser,deleteAUser,updateAUser,loginUser,logoutUser } from "../controller/UserController.js";
import {authenticateUser,authenticateAdmin} from '../middleware/authentication.js';
import asyncHandler from '../middleware/asyncHandler.js'

const route = express.Router();

const initCustomerRouter = (app)=>{
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.get("/getAllUser",asyncHandler(getAllUser));
    route.post("/createUser",asyncHandler(createAUser));
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.patch("/updateUser/:id",asyncHandler(updateAUser));
    //asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
    route.delete("/deleteUser/:id",asyncHandler(deleteAUser));
    route.post("/login",asyncHandler(loginUser));
    route.post("/logout",asyncHandler(logoutUser));
    return app.use("/api/v1/user",route);
}

export default initCustomerRouter;