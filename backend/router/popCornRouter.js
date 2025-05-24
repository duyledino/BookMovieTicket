import express from 'express'
import { getAllPopCorn } from '../controller/PopCornController.js';
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router();

const initPopCornRouter = (app)=>{
    router.get("/getAllPopCorn",asyncHandler(getAllPopCorn));
    return app.use("/api/v1/popCorn",router);
}

export default initPopCornRouter;