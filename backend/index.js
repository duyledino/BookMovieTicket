import express from 'express';
import env from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import asyncHandle from './middleware/asyncHandle.js';
import cors from 'cors'
import connectDB from './config/db.js';

env.config();

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 5000;

app.use("/api/v1/movies",asyncHandle(movieRoutes));
//get top 250 movies
//http://localhost:5000/api/v1/movies/top250

connectDB();

app.use("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    console.log("Listening on http://localhost:5000");
})
