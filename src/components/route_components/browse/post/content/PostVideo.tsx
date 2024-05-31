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
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import BottomGradient from "@/components/ui/BottomGradient"
import CatagoryDropDown from "../CatagoryDropDown"

const formSchema = z.object({
    title: z.string(),
    categoryID: z.string(),
    description: z.string().min(3, {
        message: "description must be 3 charecters long.",
    }),
    price: z.string(),
})


function PostVideo() {

    const router = useNavigate();
    const { toast } = useToast()

    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);

    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setThumbnail(file);
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
        } else {
            setThumbnailPreview(null);
        }
    };

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setVideo(file);
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setVideoPreview(null);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            categoryID: "",
            price: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        if (!thumbnail || !video) {

            toast(
                {
                    description: 'Please select both thumbnail and video files.'
                }
            )
            return
        }

        const formData = new FormData();
        
        formData.append('thumbnail', thumbnail);
        formData.append('video', video);
        formData.append('title', values.title);
        formData.append('categoryID', values.categoryID);
        formData.append('description', values.description);
        formData.append('price', values.price);

        axios.post(`/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            toast(
                {
                    description: res.data.message
                }
            )
            router(`/browse/content/${res.data.contentId}`)
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
        <div className=" w-full relative p-6 py-12 flex flex-col items-center">
            <h2 className="font-bold text-4xl w-full text-center">
                Upload Your Video Content
            </h2>
            <div className=" absolute bottom-0 right-0">
                <Toaster />
            </div>
            <p className="text-sm max-w-sm mt-2 text-neutral-500">
                Fill up all the fields to login.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" ">Title</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Contents Tittle" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" ">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Contents Description...." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryID"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" ">Category</FormLabel>
                                <FormControl>
                                    <CatagoryDropDown value={field.value} onChangeHandeler={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className=" w-full">
                                <FormLabel className=" ">Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="000" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <h1 className=" font-semibold text-sm">Thumbnail Image </h1>
                        <Input
                            type="file"
                            id="thumbnail"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            required
                        />
                        {thumbnailPreview && (<div className=" w-full overflow-hidden rounded-sm">
                            <img src={thumbnailPreview} alt="Thumbnail Preview" className=" w-full object-cover" />
                        </div>)}
                    </div>
                    <div>
                    <h1 className=" font-semibold text-sm">Content Video </h1>
                        <Input
                            type="file"
                            id="video"
                            accept="video/*"
                            onChange={handleVideoChange}
                            required
                        />
                        {videoPreview && (
                            <div className=" w-full overflow-hidden rounded-sm">
                                <video src={videoPreview} controls className=" w-full object-cover" />
                            </div>
                        )}
                    </div>
                    <Button disabled={(form.getValues().title === '' || form.getValues().description === '' || form.getValues().categoryID === '' || form.getValues().price === '') || form.formState.isSubmitting} className={` bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" type="submit`}>
                        post
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default PostVideo