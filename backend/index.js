import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import filmRouter from './router/filmRouter.js';
import calendarRouter from './router/calenarRouter.js';
import userRouter from './router/customerRouter.js';
import bookRouter from './router/bookingRouter.js';
import cookieParser from 'cookie-parser'
import getFilmOutside from './router/getFilmOutsideRouter.js'
import genreRouter from './router/genreRouter.js'
import languageRouter from './router/languageRouter.js'

env.config();

const app = express();
const PORT = process.env.PORT;

//config
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

// router
filmRouter(app);
calendarRouter(app);
userRouter(app);
bookRouter(app);
getFilmOutside(app);
genreRouter(app);
languageRouter(app);


app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})