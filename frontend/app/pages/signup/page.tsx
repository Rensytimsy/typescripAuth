"use client"
import {useForm} from "react-hook-form"
import {z} from "zod"
import { UserSignUpSchema } from "@/zod/user"
import {zodResolver} from "@hookform/resolvers/zod"
import { 
    Form, 
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios";
import { useEffect, useState } from "react"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";



export default function SignInPage(){
    const [globalError, setGlobalError] = useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof UserSignUpSchema>>({
        resolver: zodResolver(UserSignUpSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const OnSubmit = async(values: z.infer<typeof UserSignUpSchema>) => {
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/users/newuser`, values);
            console.log(response.data);
        }catch(error: any){
            setGlobalError(error.response.data.message);
        }
    }

    return(
        <div className="mt-[5%] flex flex-row justify-center align-center w-full">
            <div className="p-4 w-1/5">
                <div className="mt-3 mb-4 text-center">
                    <p className="text-xl">
                        Create Account
                    </p>
                </div>
                <Form {...form}>
                    <form 
                    action=""
                    className="space-y-4"
                    onSubmit={form.handleSubmit(OnSubmit)}
                    >
                        <FormField 
                            control={form.control}
                            name="userName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="username eg timo254..."
                                            className="p-2 rounded-sm outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Email...."
                                            className="p-2 rounded-sm outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="border">
                                            <div className="w-full flex flex-row space-x-2">
                                                {hidePassword ? <Input 
                                                    {...field}
                                                    placeholder="Enter password...."
                                                    className="p-2 rounded-sm outline-none w-[85%] focus-visible:ring-0 border-none"
                                                    type="password"
                                                />
                                                :
                                                <Input 
                                                    {...field}
                                                    placeholder="Enter password...."
                                                    className="p-2 rounded-sm outline-none w-[85%] focus-visible:ring-0 border-none"
                                                    type="text"
                                                />
                                                }
                                                
                                                {hidePassword ? <FaEye 
                                                size={20}
                                                className="mt-2 cursor-pointer"
                                                onClick={() => setHidePassword((prevState) => !prevState)}
                                                /> 
                                                : 
                                                <FaEyeSlash 
                                                size={20} 
                                                className="mt-2 cursor-pointer"
                                                onClick={() => setHidePassword((prevState) => !prevState)}
                                                />}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />

                        <div>
                            <Link
                            href="/pages/signin"
                            >
                                <p className="text-blue-700 hover:underline">Already have an account? signin here</p>
                            </Link>
                        </div>

                        <button
                        className="w-full mt-4  border p-2 cursor-pointer bg-green-300 hover:bg-green-400"
                        >Login</button>

                        <div className="mt-2 rounded-md">
                            <p className="text-red-500">{globalError}</p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}