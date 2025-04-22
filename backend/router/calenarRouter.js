import express from 'express';
import { getAllCalendar,createACalendar,updateACalendar,deleteACalendar,getSpecificCalendar } from '../controller/CalendarController.js';

const route = express.Router();

const initCalendarRouter = (app)=>{
    route.get("/getAllCalendar",getAllCalendar);
    route.get("/getSpecificCalendar",getSpecificCalendar)
    route.post("/createACalendar",createACalendar);
    route.put("/updateACalendar/:id",updateACalendar);
    route.delete("/deleteACalendar/:id",deleteACalendar);
    return app.use("/api/v1/calendar",route);
}

export default initCalendarRouter;