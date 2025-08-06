import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  getAllFilm,
  createAFilm,
  deleteAFilm,
  updateAFilm,
  getAFilm,
  getTopMoive,
  getLastestFilm,
  getAllComingSoonFilm,
  getAllNowFilm,
  getComingSoonFilmLimit4,
  getNowFilmLimit4,
  getAllActiveFilmWithSorttedCalendar
} from "../controller/FilmController.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middleware/authentication.js";

const route = express.Router();

const initFilmRouter = (app) => {
  // asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
  route.get("/getAllFilm", authenticateUser,authenticateAdmin,asyncHandler(getAllFilm));
  route.get("/topSellingMovie",authenticateUser,authenticateAdmin, asyncHandler(getTopMoive));
  route.get("/getAllComingSoonFilm" ,asyncHandler(getAllComingSoonFilm));
  route.get("/getAllNowFilm", asyncHandler(getAllNowFilm));
  route.get("/getComingSoonFilmLimit4", asyncHandler(getComingSoonFilmLimit4));
  route.get("/getNowFilmLimit4", asyncHandler(getNowFilmLimit4));
  route.post("/createFilm",authenticateUser,authenticateAdmin, asyncHandler(createAFilm));
  route.get("/getAFilm", asyncHandler(getAFilm));
  route.get("/getLastestFilm", asyncHandler(getLastestFilm));
  route.delete("/deleteFilm/:id",authenticateUser,authenticateAdmin, asyncHandler(deleteAFilm));
  route.patch(
    "/updateFilm/:id",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(updateAFilm)
  );
  route.get("/getAllFilmSortByCalendar",asyncHandler(getAllActiveFilmWithSorttedCalendar));
  return app.use("/api/v1/film", route);
};

export default initFilmRouter;
