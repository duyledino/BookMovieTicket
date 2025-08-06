import express from 'express'
import { createATheater, deleteATheater, getAllTheater } from '../controller/TheaterController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

const initRouter = (app)=>{
    router.get("/getAllTheater",authenticateUser,authenticateAdmin,asyncHandler(getAllTheater));
    router.post("/createATheater",authenticateUser,authenticateAdmin,asyncHandler(createATheater));
    router.delete("/deleteATheater",authenticateUser,authenticateAdmin,asyncHandler(deleteATheater));
    return app.use("/api/v1/theater",router);
}

export default initRouter;