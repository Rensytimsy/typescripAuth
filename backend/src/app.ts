import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middleware/errorhandler.js"
import UserRoutes from "../src/Routes/usersRoutes.js"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cookieParser())
app.use(express.json())


app.use("/api/users", UserRoutes);
//Next error handler
app.use(errorHandler);  

export default app;
