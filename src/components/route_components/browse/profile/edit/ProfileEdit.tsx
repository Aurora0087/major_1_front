import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { toast, useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import BottomGradient from "@/components/ui/BottomGradient"
import { Textarea } from "@/components/ui/textarea"

function ProfileEdit() {



    return (
        <div className=' p-12 px-6 flex gap-6 flex-col bg-slate-700 min-h-screen'>
            <h1 className=" text-white font-semibold text-3xl">
                Edit Your Profile info
            </h1>
            <Toaster/>
            <div className=" w-full bg-slate-800 rounded-md p-4">
                <Tabs defaultValue="images" className="dark w-full">
                    <TabsList className=" w-full flex">
                        <TabsTrigger className=" flex-grow" value="images">Update Images</TabsTrigger>
                        <TabsTrigger className=" flex-grow" value="information">Information</TabsTrigger>
                        <TabsTrigger className=" flex-grow" value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images">
                        <UpdateImages />
                    </TabsContent>
                    <TabsContent value="information">
                        <UpdateInformation/>
                    </TabsContent>
                    <TabsContent value="password">
                        <UpdatePassword/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


function UpdateImages() {

    const router = useNavigate();
    const { toast } = useToast()

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bg, setBg] = useState<File | null>(null);
    const [bgPreview, setBgPreview] = useState<string | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setAvatar(file);
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        } else {
            setAvatarPreview(null);
        }
    };

    const handleBgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setBg(file);
        if (file) {
            setBgPreview(URL.createObjectURL(file));
        } else {
            setBgPreview(null);
        }
    };

    const ImageFormSchema = z.object({
        title: z.string(),
    })

    const form = useForm<z.infer<typeof ImageFormSchema>>({
        resolver: zodResolver(ImageFormSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof ImageFormSchema>) {

        if (!avatar || !bg) {

            toast(
                {
                    description: 'Please select both Avatar and BackGround Images files.'
                }
            )
            return
        }

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("bgImage", bg);

        axios.post("/api/profile/edit/images", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        ).then((res) => {
            toast(
                {
                    description: res.data
                })
            setAvatar(null)
            setBg(null)
        }).catch((e) => {

            console.log(e);
            
            toast(
                {
                    description: "somthing want wrong."
                })
        })

        form.reset();
    }

    return (
        <div className=" flex flex-col gap-4 relative">
            <div className=" relative">
                <div className=' rounded-t-lg overflow-hidden w-full h-60 bg-blue-400 aspect-video'>
                    {
                        bgPreview !== null ? (
                            <img src={bgPreview} alt="bg image...." className=' w-full h-full object-cover' />
                        ) : (
                            ""
                        )
                    }
                </div>
                <div className=' absolute bottom-[-2.5rem] left-4'>
                    <Avatar className=' h-20 w-20 aspect-square border-2 border-green-400'>
                        {
                            avatarPreview !== null ? (
                                <AvatarImage className=' object-cover' src={avatarPreview} />
                            ) : (
                                <AvatarImage className=' object-cover' src="" />
                            )
                        }

                        <AvatarFallback>No</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4 w-full">
                    <div className=" flex flex-col gap-2">
                        <h1 className=" font-semibold text-slate-300 text-sm">Avatar Image </h1>
                        <Input
                            className=" bg-white"
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            required
                        />
                    </div>
                    <div className=" flex flex-col gap-2">
                        <h1 className=" font-semibold text-slate-300 text-sm">BackGround Image </h1>
                        <Input
                            className=" bg-white"
                            type="file"
                            id="bgImage"
                            accept="image/*"
                            onChange={handleBgChange}
                            required
                        />
                    </div>
                    <Button disabled={avatar === null || bg === null || form.formState.isSubmitting} className={` bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit`}>
                        post
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

function UpdateInformation() {

    const formSchema = z.object({
        newFirstName: z.string().min(3, {
            message: "First name must be 2 charecters long.",
        }),
        newLastName: z.string().min(3, {
            message: "Last name must be 2 charecters long.",
        }),
        newBio: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newFirstName: "",
            newLastName: "",
            newBio:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        axios.post("/api/profile/edit",
            values
        ).then((res) => {
            toast({
                description: res.data
            })
        }).catch((e) => {
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
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4 w-full">
                    <FormField
                        control={form.control}
                        name="newFirstName"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">First name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newLastName"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newBio"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Bio</FormLabel>
                                <FormControl>
                                    <Textarea className=" text-white" placeholder="Your Bio...." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button disabled={(form.getValues().newFirstName === '' || form.getValues().newLastName === '') || form.formState.isSubmitting} className={` bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit`}>
                        Update
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

function UpdatePassword() {

    const formSchema = z.object({
        oldPassword: z.string().min(3, {
            message: "First name must be 2 charecters long.",
        }),
        newPassword: z.string().min(3, {
            message: "Last name must be 2 charecters long.",
        }),
        confirmNewPassword: z.string(),
    }).superRefine(({ confirmNewPassword, newPassword }, ctx) => {
        if (confirmNewPassword !== newPassword) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match.",
                path: ["confirmNewPassword"],
            });
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        axios.post("/api/profile/edit/password",
            values
        ).then((res) => {
            toast({
                description: res.data
            })
        }).catch((e) => {
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
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4 w-full">
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Old Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" text-white">Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button disabled={(form.getValues().newPassword === '' || form.getValues().oldPassword === '' || form.getValues().confirmNewPassword === '') || form.formState.isSubmitting} className={` bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit`}>
                        Update
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
        </div>
    )
}


export default ProfileEdit