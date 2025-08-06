import express from 'express'
import { searchController,searchUsernameController } from '../controller/SearchController.js';

const Router = express.Router()

const initSearchRouter = (app)=>{
    Router.get("/searchFilm",searchController);
    Router.get("/searchUsername",searchUsernameController);
    return app.use("/api/v1/search",Router);
}

export default initSearchRouter