import express from 'express'
import { getAllTheater } from '../controller/TheaterController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

const initRouter = (app)=>{
    router.get("/getAllTheater",authenticateUser,authenticateAdmin,asyncHandler(getAllTheater));
    return app.use("/api/v1/theater",router);
}

export default initRouter;