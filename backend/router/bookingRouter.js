import express from "express";
import {
  getAllBooking,
  getAllBookOfSpecificCalendar,
  createABooking,
  updateABooking,
  deleteABooking,
} from "../controller/BookingController.js";

const route = express.Router();

const initBookingRouter = (app) => {
  route.get("/getAllBooking", getAllBooking);
  route.get("/getAllBookOfSpecificCalendar/:id", getAllBookOfSpecificCalendar);
  route.post("/createBooking", createABooking);
  route.put("/updateBooking/:id", updateABooking);
  route.delete("/deleteABooking/:id", deleteABooking);
  return app.use("/api/v1/booking", route);
};

export default initBookingRouter;
