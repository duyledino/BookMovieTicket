import express from 'express';
import movieApi from '../movieApi/movieApi.js'
import asyncHandle from '../middleware/asyncHandle.js';
import { queryDelete, queryGet,queryPost } from '../service/queryMovie.js';

const router = express.Router();

router.get("/popular",asyncHandle(movieApi));
router.post("/saveFavourite",asyncHandle(queryPost));
router.get("/getFavourite",asyncHandle(queryGet));
// router.delete("/deleteFavourite/:movieId",asyncHandle(queryDelete));
router.delete("/deleteFavourite", asyncHandle(queryDelete));

export default router;