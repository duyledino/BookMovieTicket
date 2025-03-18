import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { getAllFilm,createAFilm,deleteAFilm,updateAFilm } from "../controller/FilmController.js";
import { authenticateUser,authticateAdmin } from "../middleware/authentication.js";

const route = express.Router();

const initFilmRouter = (app) => {
  route.get("/getAllFilm",asyncHandler(getAllFilm));
  route.post("/createFilm",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(createAFilm));
  route.delete("/deleteFilm/:id",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(deleteAFilm));
  route.put("/updateFilm/:id",asyncHandler(authenticateUser),asyncHandler(authticateAdmin),asyncHandler(updateAFilm));
  return app.use("/api/v1/film",route);
};

export default initFilmRouter;
