import {NextFunction, Request, Response} from "express";
import { DbUserSchema } from "../../zod/users.js";
import {z} from "zod"
import { PrismaClient } from "#generated/prisma/index.js";
import bcrypt from "bcryptjs"
import { Types, ObjectId } from "mongoose";

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
            userAvatar,
            admin
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
                userAvatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=user${Math.floor(Math.random() * 500)}`,
                admin: false
            }
        });

        res.status(200).json({createduser: newUser});
    }catch(error){
        next(error);
    }
}

//Get all users
export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const allUsers = await prisma.users.findMany();
        //If the returned user object array.length is less than atleat one or more then no users were found
        if(allUsers.length < 1) {
            res.status(401).json({message: "No users found"});
        }
        //finally return all users retrived from the database
        res.status(200).json(allUsers);
    }catch(error: any){
        next(error);
    }
}

//Update user
export const UpdateUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.query;
        //Below checks the id passed in the query if an id is an array multiple id parameters use the first one else no id found
        if(!id || (Array.isArray(id) ? id[0] : id ).toString() !== id){
            return res.status(403).json({message: "Invalid user id parameter"});
        }
        //Check if the id provided is a string and a valid mongodb id ObjectId
        if(typeof id !== "string" || !Types.ObjectId.isValid(id)){
            res.status(403).json({message: "Invalid user id parameter"});
        }

        //Check if the passed query is an array of id's if yes then use the first id
        const idString = Array.isArray(id) ? id[0] : id;

        const foundUser = await prisma.users.findUnique({
            where: {id: idString}
        });

        if(!foundUser){
            return res.status(404).json({message: "User dosen't exist"});
        };
        //data to update 
        const {
            userName,
            email,
            admin,
            userAvatar,
            password
        }: z.infer<typeof DbUserSchema> = req.body;
        //If user updates the password then we want to encrypt it before it is passed to the database
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //If user was found that means the document exist then proceed to update the passed fields
        const updatedUserData = await prisma.users.update({
            where: {id: idString},
            data: {
                userName,
                email,
                password: hash,
                admin
            }
        });

        //After update return the updated user data
        res.status(200).json({
            updateduser: updatedUserData
        });


    }catch(error){
        next(error);
    }
}

//Delete user
export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userid:string = req.params.id || "";
        //find user if first exists in the database
        const foundUser = await prisma.users.findUnique({
            where: {id: userid}
        });
        //Check if the provided user id is a valid mongodb id
        if(!(typeof userid === "string" || Types.ObjectId.isValid(userid))){
            res.status(403).json({message: "Invalid document id provided"});
        }

        //If a user was found then we can proceed to delete the document hence if not found no document can be deleted
        if(!foundUser) {
            res.status(404).json({message: "User doesn't exist!"});
        }

        //Delete document with user id
        await prisma.users.delete({
            where: {id: userid}
        });

        //return a request based if the delete was successfull or not !
        res.status(200).json({message: "User deleted successfully"});
        
    }catch(error){
        next(error);
    }
}