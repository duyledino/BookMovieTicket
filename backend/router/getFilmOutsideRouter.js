import express from 'express';
import GetAllFilmController from '../controller/GetFilmOutsideController.js';
import asyncHandler from '../middleware/asyncHandler.js';


const router = express.Router();

const initGetFilmRouter = (app)=>{
    router.get("/getFilmOutside",asyncHandler(GetAllFilmController))
    return app.use("/api/v1/FilmOutside",router);
}

export default initGetFilmRouter;