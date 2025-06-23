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
        const token = jwt.sign({id: foundUser?.id, userName: foundUser?.userName}, jwtsecret, {expiresIn: "1h"});

        res.cookie(
            "token", 
            token, 
            {sameSite: "strict", httpOnly: true, secure: false }
            ).status(201).json({user: foundUser});

    }catch(error){
        next(error);
    }
}
