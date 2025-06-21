import {NextFunction, Request, Response} from "express";
import { DbUserSchema } from "../../zod/users.js";
import {z} from "zod"
import { PrismaClient } from "#generated/prisma/index.js";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();


//create user 
export const CreateUser = async(req: Request, res: Response, next: NextFunction) => {
    //Below generateRanNum generates random numbers for users profile avatar
    const generateRanNum = Math.floor(Math.random() * 500);
    try{
        const {
            userName,
            email,
            password, 
            userAvatar
        }: z.infer<typeof DbUserSchema> = req.body;
        //Make sure that all required fields are provided
        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        //get user password and encrypt it before creating a document to the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //check if the user exists in the database before creating a duplicate if one exists
        const isUser = await prisma.users.findUnique({
            where: {email: email, userName: userName}
        });

        //If user exists send a return a message on user existance
        if(isUser) {
            res.status(401).json({message: "Username and email exists please try different Username or email"});
        }

        const newUser = await prisma.users.create({
            data: {
                userName,
                email,
                password: hash,
                userAvatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=user${Math.floor(Math.random() * 500)}`
            }
        });

        res.status(200).json({createduser: newUser});
    }catch(error){
        next(error);
    }
}