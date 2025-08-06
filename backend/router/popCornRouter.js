import express from "express";
import {
  createAPopcorn,
  deleteAPopcorn,
  getAllpopcorn,
} from "../controller/PopCornController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  authenticateAdmin,
  authenticateUser,
} from "../middleware/authentication.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

const initPopCornRouter = (app) => {
  router.get("/getAllPopCorn", asyncHandler(getAllpopcorn));
  router.post(
    "/createAPopCorn",
    authenticateUser,
    authenticateAdmin,
    asyncHandler(createAPopcorn)
  );
  router.delete(
    "/deleteAPopCorn",
    authenticateUser,
    authenticateAdmin,
    asyncHandler(deleteAPopcorn)
  );
  return app.use("/api/v1/popCorn", router);
};

export default initPopCornRouter;
