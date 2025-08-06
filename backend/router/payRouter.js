import express from 'express'
import { createPaymentController, getPaymentResult } from '../controller/PaymentController.js';

const Router = express.Router()

const initRouter = (app)=>{
    Router.post("/create_payment_url",createPaymentController);
    Router.get("/payment_result",getPaymentResult);
    return app.use("/api/v1/payment",Router);
}

export default initRouter;