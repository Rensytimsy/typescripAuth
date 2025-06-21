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



export default function SignInPage(){

    const form = useForm<z.infer<typeof UserSignUpSchema>>({
        resolver: zodResolver(UserSignUpSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const OnSubmit = (values: z.infer<typeof UserSignUpSchema>) => {
        console.log(values);
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
                                        <Input 
                                            {...field}
                                            placeholder="Enter password...."
                                            className="p-2 rounded-sm outline-none"
                                        />
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
                    </form>
                </Form>
            </div>
        </div>
    )
}