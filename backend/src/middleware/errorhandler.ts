import {Request, Response, NextFunction} from "express";

interface AppError extends Error {
    status?: number
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message || "Internal Server error",
        stack: err.stack,
        success: false,
        status: err.status
    });
}