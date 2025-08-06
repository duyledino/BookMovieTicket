import express from "express"
import { testGetReponseBot, testGetReponseBot1 } from "../controller/BotController.js"
import asyncHandler from "../middleware/asyncHandler.js"

const Router = express.Router()

const initBotRouter = (app)=>{
    Router.post("/testBot",asyncHandler(testGetReponseBot1))
    return app.use("/api/v1/bot",Router);
}

export default initBotRouter