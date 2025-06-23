import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import {NextFunction, Request, Response} from "express";
import { PrismaClient } from "#generated/prisma/index.js";

interface User {
    userName: string,
    email: string,
    password: string
}

//Initialize prisma client
const prisma = new PrismaClient();


export const UserLogin = async(req: Request, res: Response, next: NextFunction) => {
    try{
        //provided with the username and password provided retrive a use document from the database
        const {userName, email, password}: User = req.body;

        const foundUser = await prisma.users.findUnique({
            where: {email: email}
        });

        //if no user was found that then means that the user isn't registered
        if(!foundUser) {
            res.status(404).json({message: "User not found!"});
        }   

        //if user exist then proceed to authenticate the user
        const jwtsecret:string = process.env.JWT_SECRET || ""
        const token = jwt.sign({id: foundUser?.id, userName: foundUser?.userName, admin: foundUser?.admin}, jwtsecret, {expiresIn: "1h"});

        res.cookie(
            "token", 
            token, 
            {sameSite: "strict", httpOnly: true, secure: false }
            ).status(201).json({user: foundUser});

    }catch(error){
        next(error);
    }
}

interface NewRequest extends Request {
    data?: any
}


//Once we find a user, then we authenticate the user
export const VerifyToken = async(req: NewRequest, res: Response, next: NextFunction) => {
    try{
        //get the cookie from the request body, or just the request object
        const cookieToken = req.cookies.token;
        const jwt_token: string = process.env.JWT_SECRET || "";
        if(!cookieToken) return res.status(403).json({message: "You are currently logged out please login!"});
        //If a cookie exists then we can get to verify it using jwt
        jwt.verify(cookieToken, jwt_token, (error:any, data: any) => {
            if(error) {
                // console.log(error);
                return res.status(403).json({message: "Invalid cookie token"});
            }
            req.data = data;
            next();
        });

    }catch(error){
        next(error);
    }
}

//verify user check if a user is logged.
export const VerifyUser = async(req: NewRequest, res: Response, next: NextFunction) => {
    try{
        VerifyToken(req, res, error => {
            try{
                if(req.data?.userName){
                    next();
                }else{
                    res.status(404).json("Not authenticated");
                }
            }catch(error){
                next(error);
            }
        })
    }catch(error){
        next(error);
    }
}

//verify admin check if a user i an admin and give different functionalities.
export const VerifyAdmin = async(req: NewRequest, res: Response, next: NextFunction) => {
    try{
        VerifyToken(req, res, error => {
            try{
                if(req.data.admin === true){
                    next();
                }else{
                    res.status(403).json({message: "You are not an admin"})
                }
            }catch(error){
                next(error);
            }
        })
    }catch(error){
        next(error);
    }
}