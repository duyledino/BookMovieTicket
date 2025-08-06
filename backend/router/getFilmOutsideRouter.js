import express from 'express';
import {GetAllFilmController,getDetailFilm} from '../controller/GetFilmOutsideController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';


const router = express.Router();

const initGetFilmRouter = (app)=>{
    router.get("/getFilmOutside",authenticateUser,authenticateAdmin,asyncHandler(GetAllFilmController))
    router.get("/getFilmDetail/:id",authenticateUser,authenticateAdmin,asyncHandler(getDetailFilm));
    return app.use("/api/v1/FilmOutside",router);
}

export default initGetFilmRouter;