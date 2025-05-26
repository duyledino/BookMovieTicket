import express from "express";
import {
  getAllBooking,
  getAllBookOfSpecificCalendar,
  createABooking,
  updateABooking,
  deleteABooking,
  getNumberOfBookingByMonth,
  getAllRevenue,getAllRevenueWeekDay
} from "../controller/BookingController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const route = express.Router();

const initBookingRouter = (app) => {
  route.get("/GetTotalWeekDay",authenticateUser,authenticateAdmin,asyncHandler(getAllRevenueWeekDay))
  route.get("/getTotalRevenue",authenticateUser,authenticateAdmin,asyncHandler(getAllRevenue))
  route.get("/getCountBooking",authenticateUser,authenticateAdmin,asyncHandler(getNumberOfBookingByMonth));
  route.get("/getAllBooking", authenticateUser,authenticateAdmin,asyncHandler(getAllBooking));
  route.get("/getAllBookOfSpecificCalendar/:id", asyncHandler(getAllBookOfSpecificCalendar));
  route.post("/createBooking",asyncHandler(authenticateUser),asyncHandler(createABooking));
  route.put("/updateBooking/:id",authenticateUser,authenticateAdmin, asyncHandler(updateABooking));
  route.delete("/deleteABooking/:id",authenticateUser,authenticateAdmin, asyncHandler(deleteABooking));
  return app.use("/api/v1/booking", route);
};

export default initBookingRouter;
