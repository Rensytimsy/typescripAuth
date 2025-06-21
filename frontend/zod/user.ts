import {object, string} from "zod";

export const UserLoginSchema = object({
    email: string({required_error: "Please provide email!"}).email(),
    password: string({required_error: "Provide a password!"}).min(4),
})


export const UserSignUpSchema = object({
    email: string({required_error: "Please provide email!"}).email(),
    password: string({required_error: "Provide a password!"}).min(4),
    userName: string({required_error: "Please provide a user name"}).min(3)
})