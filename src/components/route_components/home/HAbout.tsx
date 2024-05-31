
import Title from '../common/Title'
import OnlineCourses from './OnlineCourses'

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import { videoContentsGetProps } from '@/lib/types/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoveRight, ThumbsUp } from 'lucide-react';

const HAbout = () => {

    const { toast } = useToast()

    const [content, setContent] = useState<null | videoContentsGetProps>(null);

    const getValue = {
        ignore: '0',
        limit: '3'
    }

    useEffect(() => {
        axios.post("/api/get/videocontents", getValue).then((res) => {
            setContent(res.data)
            console.log(res.data);
        })
            .catch((e) => {
                toast(
                    {
                        description: "somthing want wrong"
                    }
                )
            })
    }, [])

    return (
        <>
            <section className=" py-6">
                <div className="container">
                    <div className=' text-3xl font-semibold text-green-500/75 mb-10'>
                        <Title subtitle="Our Courses" title="Explore our popular online courses" />
                    </div>
                    {
                        content === null ? (
                            <div className=' py-4'>
                                <h1 className=' text-3xl font-bold grid place-content-center w-full p-12 bg-red-400 text-white rounded-lg'>No Content Found</h1>
                            </div>
                        ) : (
                            <div className="coursesCard">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {
                                        content?.contents.map((valu) => {
                                            return (
                                                <div className=' p-4 border rounded-lg border-blue-400 grid gap-4'>
                                                    <h1 className=' text-2xl font-bold'>{valu.title}</h1>
                                                    <span className=' p-2 bg-purple-500 w-fit rounded-full py-1 text-white font-semibold'>{valu.category}</span>
                                                    <div className=' overflow-hidden w-full aspect-video rounded-lg'>
                                                        <img className=' w-full h-full object-cover' src={valu.thumbnailUrl} alt="not found" />
                                                    </div>
                                                    <div className=' flex items-center justify-between'>
                                                        <div className='flex items-center'>
                                                            <Avatar className=' border-2 border-transparent focus:border-green-400 hover:border-green-500'>
                                                            <AvatarImage className=' focus:opacity-90 hover:opacity-90 object-cover' src={valu.author.avatarUrl} />
                                                            <AvatarFallback>{`${valu.author.firstName.charAt(0)}${valu.author.lastName.charAt(0)}`}</AvatarFallback>
                                                        </Avatar>
                                                        <span>{valu.author.userName}</span>
                                                        </div>
                                                        
                                                        <span className='flex gap-2'>
                                                            <ThumbsUp/>
                                                            {valu.likeList.length}</span>
                                                    </div>
                                                    <div className=' rounded-lg border p-2 bg-slate-200'>
                                                        price ₹
                                                        <span className=' font-semibold text-green-500'>
                                                            {valu.price}
                                                        </span>
                                                    </div>
                                                    <a className=' bg-slate-800 hover:bg-slate-600 hover:text-blue-500 capitalize p-4 flex gap-2 items-center rounded-md text-white font-semibold' href={`/browse/content/${valu.vid}`} >
                                                        <span>
                                                            view content
                                                        </span>
                                                        <MoveRight/>
                                                    </a>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                </div>
            </section>
            <OnlineCourses />
        </>
    )
}

export default HAbout
