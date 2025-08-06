import express from 'express'
import { authenticateAdmin, authenticateUser } from '../middleware/authentication';

const Router = express.Router();

const initSeat = (app)=>{
    Router.get("/getAllSeat",getAllSeat);
    Router.patch("/upateASeat",authenticateUser,authenticateAdmin,updateASeat);
    return app.use("/api/v1/seat",Router)
}

export default initSeat;