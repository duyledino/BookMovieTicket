import express from 'express'

const Router = express.Router();

const initSeat = (app)=>{
    Router.get("/getAllSeat",getAllSeat);
    Router.patch("/upateASeat",updateASeat);
    return app.use("/api/v1/seat",Router)
}

export default initSeat;