import express from "express";
import cors from "cors";
import env from "dotenv";
import filmRouter from "./router/filmRouter.js";
import calendarRouter from "./router/calenarRouter.js";
import userRouter from "./router/customerRouter.js";
import bookRouter from "./router/bookingRouter.js";
import cookieParser from "cookie-parser";
import getFilmOutside from "./router/getFilmOutsideRouter.js";
import genreRouter from "./router/genreRouter.js";
import languageRouter from "./router/languageRouter.js";
import theaterRouter from "./router/theaterRouter.js";
import popCornRouter from "./router/popCornRouter.js";
import botRouter from "./router/testBotRouter.js";
import searchRouter from "./router/searchRouter.js";
import paymentRouter from './router/payRouter.js'
import { pool, testPool } from "./utils/configPostgres.js";
import { WebSocketServer } from "ws";
import http from "http";
import {testGetReponseBot} from "./controller/BotController.js"
import { redisClient, syncPostgresToRedis } from "./controller/SearchController.js";

env.config();

const app = express();
const PORT = process.env.PORT; // 8001

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// router
filmRouter(app);
calendarRouter(app);
userRouter(app);
bookRouter(app);
getFilmOutside(app);
genreRouter(app);
languageRouter(app);
theaterRouter(app);
popCornRouter(app);
botRouter(app);
searchRouter(app);
paymentRouter(app);

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.listen(PORT,()=>{
//     console.log(`Listening on http://localhost:${PORT}`);
// })

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });
wss.on("connection", (ws) => {
  console.log("🔌 Client connected");
  ws.on("message", async (msg) => {
    console.log("Received: " + msg.toString());
    const botResponse = await testGetReponseBot(msg.toString());
    console.log("in socket -----------",botResponse);
    ws.send(JSON.stringify({ server: botResponse }));
  });
  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
  console.log("Hello from Websocket server");
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

testPool();

redisClient.on("error", (err) => console.log("Redis client error", err));
redisClient.connect();
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  try {
    await redisClient.del('autocomplete'); // Delete before disconnecting
    await redisClient.quit(); // Gracefully close connection
    console.log('Redis data cleared and connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});


syncPostgresToRedis();
setInterval(syncPostgresToRedis,20000); // refresh each 20s
