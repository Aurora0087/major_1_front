import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthButton from '../common/AuthButton'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Search } from "lucide-react";

function BrowseHeader() {

    const [data, setData] = useState(null)

    function userAuth() {
        axios.get(`/api/auth`).then((res) => setData(res.data))
            .catch((e: any) => { })
    }

    useEffect(() => {
        userAuth()
    }, [])
    
  return (
    <div className=' p-4 px-8 bg-slate-800 border-b-2 border-blue-500/55 text-center flex justify-between items-center z-40'>
            <div className=' font-bold text-3xl text-white'>
                <Link to={"/"}>
                    KSJ
                </Link>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
            <AuthButton data={data} afterLogin={userAuth} />
            </div>
        </div>
  )
}

const formSchema = z.object({
    topic: z.string(),
})

function SearchBar() {

    const router = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            topic: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        router(`/browse/search/${values.topic}`)
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className='flex items-center w-fit'>
                        <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormControl className="">
                                    <Input placeholder="music" className=" rounded-l-full border-none shadow-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={form.getValues().topic === '' || form.formState.isSubmitting} type="submit" className=" h-full rounded-r-full">
                        <Search/>
                    </Button>
                    </div>
                    
                </form>
            </Form>
        </div>
    )
}

export default BrowseHeader