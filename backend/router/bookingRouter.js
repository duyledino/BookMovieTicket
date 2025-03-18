import express from "express";
import {
  getAllBooking,
  getAllBookOfSpecificCalendar,
  createABooking,
  updateABooking,
  deleteABooking,
} from "../controller/BookingController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const route = express.Router();

const initBookingRouter = (app) => {
  route.get("/getAllBooking", asyncHandler(getAllBooking));
  route.get("/getAllBookOfSpecificCalendar/:id", asyncHandler(getAllBookOfSpecificCalendar));
  route.post("/createBooking", asyncHandler(createABooking));
  route.put("/updateBooking/:id", asyncHandler(updateABooking));
  route.delete("/deleteABooking/:id", asyncHandler(deleteABooking));
  return app.use("/api/v1/booking", route);
};

export default initBookingRouter;
