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
import BottomGradient from "./BottomGradient"


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, {
        message: "Password must be 3 charecters long.",
    }),
})

function LoginForm({afterLogin,closeDialog}:{afterLogin:()=>void,closeDialog:()=>void}) {

    const router = useNavigate();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post(`/api/login`, values).then((res) => {
            afterLogin()
            toast(
                {
                    description: res.data.message
                }
            )
            closeDialog()
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
        <div className=" w-full relative">
            <h2 className="font-bold text-xl text-neutral-200">
                Welcome to IDK
            </h2>
            <div className=" absolute bottom-0 right-0">
            <Toaster />
            </div>
            <p className="text-sm max-w-sm mt-2 text-neutral-400">
                Fill up all the fields to login.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Email</FormLabel>
                                <FormControl className=" w-full">
                                    <Input className=" w-full" placeholder="user@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Password</FormLabel>
                                <FormControl className=" w-full">
                                    <Input className=" w-full" placeholder="••••••••" type="password" {...field} />
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
            <div className=" text-sm mt-2 text-neutral-400 border-t-2 border-blue-400 pt-4 flex flex-col gap-4 w-full">
                <p className=" text-center">Not a user?</p>
                <Link to={"/loginsignup"}>
                    <Button className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
                        Register&rarr;
                        <BottomGradient />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm