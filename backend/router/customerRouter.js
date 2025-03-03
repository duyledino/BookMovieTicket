import express from "express";
import { getAllUser,createAUser,deleteAUser,updateAUser } from "../controller/UserController.js";

const route = express.Router();

const initCustomerRouter = (app)=>{
    route.get("/getAllUser",getAllUser);
    route.post("/createUser",createAUser);
    route.put("/updateUser/:id",updateAUser);
    route.delete("/deleteUser/:id",deleteAUser);
    return app.use("/api/v1/user",route);
}

export default initCustomerRouter;