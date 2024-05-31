import { useState } from 'react';
import './loginsignup.css';


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios"

import { Link, useNavigate } from "react-router-dom"
import BottomGradient from '@/components/ui/BottomGradient';



const LoginSignup = () => {
    const [signUpMode, setSignUpMode] = useState(false);

    const handleSignUpClick = () => {
        setSignUpMode(true);
    };

    const handleSignInClick = () => {
        setSignUpMode(false);
    };

    return (
        <div className={`login ${signUpMode ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <LoginForm />
                    <SignUpForm/>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            "Discover endless learning at Knowledge Swap Junction –
                            Your ultimate destination for skill enhancement and personal growth. Join now!"
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                            Sign up
                        </button>
                    </div>
                    <img src="public/images/loginsignup/log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel ">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>

                            "Upgrade your skills with Knowledge Swap Junction: Your gateway to limitless e-learning opportunities!"
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
                            Sign in
                        </button>
                    </div>
                    <img src="public/images/loginsignup/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
};

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, {
        message: "Password must be 3 charecters long.",
    }),
})

function LoginForm() {

    const router = useNavigate();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        axios.post(`/api/login`, values).then((res) => {
            toast(
                {
                    description: res.data.message
                }
            )
            router("/browse")
        })
            .catch((e: any) => {
                console.log(e);
                toast(
                    {
                        description: "somthing gose wrong"
                    }
                )
            })

        form.reset();
    }

    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full place-content-center grid gap-4 py-4 sign-in-form">
                <div>
                    <h1 className=' text-3xl font-semibold'>Log in</h1>
                </div>
                <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel className="">Email</FormLabel>
                                <FormControl>
                                    <Input className=' w-full' placeholder="user@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={form.getValues().email === '' || form.getValues().password === '' || form.formState.isSubmitting} className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit">
                        &larr;Sign in
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
    )
}

const signUpFormSchema = z.object({
    firstName: z.string().min(1, {
        message: "First Name must be at least 1 character long.",
    }),
    lastName: z.string().min(1, {
        message: "Last Name must be at least 1 character long.",
    }),
    email: z.string().email(),
    password: z.string().min(3, {
        message: "Password must be 3 charecters long.",
    }),
    confirmPassword: z.string().min(3, {
        message: "Password must be 3 charecters long.",
    }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match.",
            path: ["confirmPassword"],
        });
    }
})

function SignUpForm() {

    const router = useNavigate();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: z.infer<typeof signUpFormSchema>) {
        axios.post("/api/register", values)
            .then((res) => {
                toast(
                    {
                        description: res.data.message
                    }
                )
                router('/')
            })
            .catch((e) => {
                console.log(e);
                
                toast(
                    {
                        description: "somthing want wrong"
                    }
                )
                form.reset()
            })
    }

    return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 top-0 sign-up-form">
                <div>
                    <h1 className=' text-3xl font-semibold'>
                        Register here
                    </h1>
                    <Toaster/>
                </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="demo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="demo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" ">Email</FormLabel>
                                <FormControl>
                                    <Input className=' w-full' placeholder="user@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" ">Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" ">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className={`bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`} type="submit" disabled={form.formState.isSubmitting}>
                        {`${form.formState.isSubmitting ? ('Submitting...') : ('Register ')}`}
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
    )
}

export default LoginSignup;

