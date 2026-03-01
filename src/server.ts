import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import "dotenv/config";
import { logHandler } from "./middleware/logger";
import cors from 'cors'
import route from "./routes";
import { errorHandler } from "./middleware/errorhandling";
import { rateLimitHandler } from "./middleware/ratelimithandler";
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(logHandler)

app.use(rateLimitHandler)

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use('/api', route)

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, ()=>{
  console.log(`Server is running on ${port}`)
})
