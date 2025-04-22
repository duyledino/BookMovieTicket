import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { getAllFilm,createAFilm,deleteAFilm,updateAFilm,getAFilm } from "../controller/FilmController.js";
import { authenticateUser,authenticateAdmin } from "../middleware/authentication.js";

const route = express.Router();

const initFilmRouter = (app) => {
  route.get("/getAllFilm",asyncHandler(getAllFilm));
  // asyncHandler(authenticateUser),asyncHandler(authenticateAdmin)
  route.post("/createFilm",asyncHandler(createAFilm));
  route.get("/getAFilm",asyncHandler(getAFilm));
  route.delete("/deleteFilm/:id",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(deleteAFilm));
  route.patch("/updateFilm/:id",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(updateAFilm));
  return app.use("/api/v1/film",route);
};

export default initFilmRouter;
