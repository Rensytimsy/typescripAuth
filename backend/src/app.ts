import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middleware/errorhandler.js"
import UserRoutes from "../src/Routes/usersRoutes.js"
import dotenv from "dotenv"
import Cors from "cors"
dotenv.config();

//cors configuration object
const corsConfig = Cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(corsConfig);


app.use("/api/users", UserRoutes);
//Next error handler
app.use(errorHandler);  

export default app;
