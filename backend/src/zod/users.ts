import {boolean, object, string} from "zod";


export const DbUserSchema = object({
    userName: string(),
    password: string(),
    email: string(),
    userAvatar: string(),
    admin: boolean()
});