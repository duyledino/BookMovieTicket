import express from "express";
import {
  getAllCalendar,
  createACalendar,
  updateACalendar,
  deleteACalendar,
  getSpecificCalendar,
  getAllCalendarFromASpecificFilm
} from "../controller/CalendarController.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const route = express.Router();

const initCalendarRouter = (app) => {
  route.get("/getAllCalendar", getAllCalendar);
  route.get("/getSpecificCalendar", getSpecificCalendar);
  route.get("/getAllCalendarFromASpecificFilm",getAllCalendarFromASpecificFilm);
  route.post("/createACalendar", authenticateUser,authenticateAdmin,createACalendar);
  route.put("/updateACalendar/:id",authenticateUser,authenticateAdmin, updateACalendar);
  route.delete("/deleteACalendar/:id",authenticateUser,authenticateAdmin, deleteACalendar);
  return app.use("/api/v1/calendar", route);
};

export default initCalendarRouter;
