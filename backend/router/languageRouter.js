import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  getAllLanguages,
  createALanguage,
  deleteALanguage,
  createALanguageFilm,
  getLanguagesFromAFilm,
} from "../controller/LanguageController.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middleware/authentication.js";

const route = express.Router();

const initLanguageRouter = (app) => {
  route.get("/getAllLanguages", asyncHandler(getAllLanguages));
  route.get(
    "/getLanguagesFromAFilm/:film_id",
    asyncHandler(getLanguagesFromAFilm)
  );
  route.post("/createLanguage", asyncHandler(createALanguage));
  route.post("/createALanguageFilm", asyncHandler(createALanguageFilm));
  route.delete("/deleteLanguage/:id", asyncHandler(deleteALanguage));

  return app.use("/api/v1/language", route);
};

export default initLanguageRouter;
