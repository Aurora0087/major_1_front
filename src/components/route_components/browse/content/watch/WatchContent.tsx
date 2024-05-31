import { Link, useLocation } from 'react-router-dom'

import { SearchParamProps, contentFindByIdProps } from '@/lib/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Button } from '@/components/ui/button'
import { Clock, ThumbsUp } from 'lucide-react'
import { convertToLocalTime } from '@/lib/commone'
import CommentSection from '@/components/ui/CommentSection'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function WatchContent() {

    const location = useLocation()
    const id = location.pathname.split("/")[4]

    const [isloading, setIsLoading] = useState(true)
    const [videoUrl, setVideoUrl] = useState("")
    const [content, setContent] = useState<contentFindByIdProps | null>(null)
    const [likeCount, setLikeCount] = useState<number>(0)
    const [isLiked, setIsLiked] = useState(false)
    const [isLiking, setIsliking] = useState(false)

    const { toast } = useToast()

    function toggleLikeButton() {

        setIsliking(true)
        axios.post(`/api/like/video/${id}`).then((res) => {

            setIsLiked(!isLiked)
            setIsliking(false)

            if (!isLiked) {
                setLikeCount(likeCount + 1)
            }
            else {
                setLikeCount(likeCount - 1)
            }

            toast(
                {
                    description: res.data.message
                }
            )
        })
            .catch((e) => {
                setIsliking(false)
                toast(
                    {
                        description: e.response.data.message
                    }
                )
            })
    }

    useEffect(() => {
        axios.post(`/api/watch/${id}`).then((res) => {
            setIsLoading(false)

            if (res.status === 200) {
                setVideoUrl(res.data.videoUrl)
            }
            else if (res.status === 403) {
                toast(
                    {
                        description: res.data.message
                    }
                )
            }
        }).catch((e) => {
            setIsLoading(false)
            toast(
                {
                    description: e.response.data.message
                }
            )
        })

        axios.get(`/api/get/videocontent/${id}`).then((res) => {

            console.log(res.data);
            setContent(res.data)
            setLikeCount(res.data.videoContent.likeList.length)
            setIsLiked(res.data.videoContent.isLiked)
        }).catch((e) => {

            console.log(e);

            toast(
                {
                    description: e.response.data.message
                }
            )
        })
    }, [])


    return (
        <div className=' w-full flex flex-row gap-4 p-6'>
            <Toaster />
            {
                isloading ? (
                    <div className='w-full aspect-video rounded-md bg-white text-slate-700 grid place-content-center font-bold text-3xl p-4'>
                        Loading...
                    </div>
                ) : (
                    <div className=' w-full'>
                        {
                            videoUrl.length > 0 && content !== null ? (
                                <div className='flex flex-col gap-4 bg-white p-4 rounded-lg'>
                                    <video controls src={videoUrl} className=' w-full aspect-video'></video>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className=' text-black text-3xl font-bold'>{content.videoContent.title}</h1>
                                        <div className=' flex justify-between items-center'>
                                            <p className='p-2 py-1 flex gap-2 text-sm w-fit text-slate-600'>
                                                <Clock />
                                                <span className=''>{convertToLocalTime(content.videoContent.createAt)}</span>
                                            </p>
                                            <Button disabled={isLiking} onClick={() => { toggleLikeButton() }} className=' flex gap-2 hover:cursor-pointer focus:cursor-pointer'>
                                                <ThumbsUp className={`${isLiked ? (" text-red-400") : ("")} hover:text-green-400`} />
                                                {likeCount}
                                            </Button>
                                        </div>
                                        <div className={`h-fit w-full p-4 rounded-md bg-green-400 text-slate-700`}>
                                            {content.videoContent.description}
                                        </div>
                                        <div className=' flex items-center gap-4'>
                                            <Link className=" relative w-fit h-full" to={"/browse/profile/" + content.videoContent.author.profileId}>
                                                <Avatar className=' border-2 border-transparent focus:border-green-400 hover:border-green-500'>
                                                    <AvatarImage className=' focus:opacity-90 hover:opacity-90 object-cover' src={content.videoContent.author.avatarUrl} />
                                                        <AvatarFallback>{content.videoContent.author.firstName[0]+content.videoContent.author.lastName[0]}</AvatarFallback>
                                                </Avatar>
                                                </Link>
                                                <div className=' flex flex-col gap-2'>
                                                    <span className=' font-semibold text-blue-500'>{content.videoContent.author.firstName+" " + content.videoContent.author.lastName}</span>
                                                    <span className=' font-semibold text-slate-500'>{content.videoContent.author.userName}</span>
                                                </div>
                                        </div>
                                        <CommentSection id={id} contentType='VIDEO' />
                                    </div>
                                </div>

                            ) : (
                                <div className=' w-full aspect-video rounded-md bg-red-400 text-white grid place-content-center font-bold text-3xl p-4'>
                                    Content do not exist or you have to buy it.
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default WatchContent