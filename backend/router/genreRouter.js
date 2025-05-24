import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  getAllGenres,
  createAGenre,
  deleteAGenre,
  getGenresFromAFilm,
  createAGenreFilm
} from "../controller/GenreController.js";
import { authenticateUser, authenticateAdmin } from "../middleware/authentication.js";

const route = express.Router();

const initGenreRouter = (app) => {
  route.get("/getAllGenres", asyncHandler(getAllGenres));
  route.get("/getGenresFromAFilm/:film_id",asyncHandler(getGenresFromAFilm))
  route.post("/createGenre",authenticateUser,authenticateAdmin, asyncHandler(createAGenre));
  route.post("/createAGenreFilm",authenticateUser,authenticateAdmin,asyncHandler(createAGenreFilm));
  route.delete("/deleteGenre/:id", asyncHandler(authenticateUser), asyncHandler(authenticateAdmin), asyncHandler(deleteAGenre));

  return app.use("/api/v1/genre", route);
};

export default initGenreRouter;
