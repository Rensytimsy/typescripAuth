import {model, models, Schema} from "mongoose";
import { DbUserSchema } from "../zod/users.js";
import {z} from "zod"

const User = new Schema<z.infer<typeof DbUserSchema>>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//export User schema

export const UserSchema = models?.Users || model("Users", User);