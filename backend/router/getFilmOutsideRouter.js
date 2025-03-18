import express from 'express';
import {GetAllFilmController,getDetailFilm} from '../controller/GetFilmOutsideController.js';
import asyncHandler from '../middleware/asyncHandler.js';


const router = express.Router();

const initGetFilmRouter = (app)=>{
    router.get("/getFilmOutside",asyncHandler(GetAllFilmController))
    router.get("/getFilmDetail/:id",asyncHandler(getDetailFilm));
    return app.use("/api/v1/FilmOutside",router);
}

export default initGetFilmRouter;