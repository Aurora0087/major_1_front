import { Comment, CommentSectionProps } from '@/lib/types/types'

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

import { toast, useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios"

import { Link, useNavigate } from "react-router-dom"
import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import CommentCard from '../route_components/sheared/CommentCard'

const formSchema = z.object({
    text: z.string(),
})

function CommentSection({ id, contentType }: CommentSectionProps) {


    const router = useNavigate();
    const { toast } = useToast()

    const [comments, setComments] = useState<null | Comment[]>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: ""
        },
    })

    function getComments() {
        axios.post('/api/get/childComment',
            {
                "parentId": id,
                "parentType": contentType,
                "ignore": "0",
                "limit": "50"
            }
        ).then((res) => {

            setComments(res.data.commentList)

        }).catch((e) => {
            toast(
                {
                    description: e.response.data.message
                }
            )
        })
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        axios.post(`/api/add/comment`, {
            "parentId": id,
            "text": values.text,
            "parentType": contentType
        }).then((res) => {
            toast(
                {
                    description: res.data.message
                }
            )
            getComments()
        })
            .catch((e: any) => {
                console.log(e);
                toast(
                    {
                        description: e.response.data.message
                    }
                )
            })

        form.reset();
    }

    useEffect(() => {
        getComments()
    },[])


    return (
        <div className=' w-full py-4 border-y-2 border-blue-500'>
            <div className=' w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full flex flex-row justify-start items-center pb-4">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem className=' flex w-full'>
                                    <FormControl>
                                        <Input className='' placeholder="hola..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={form.getValues().text === '' || form.formState.isSubmitting} type="submit">
                            <Send />
                        </Button>
                    </form>
                </Form>
            </div>
            <div className=' flex flex-col gap-4 py-4 border-t-2'>
                <span className=' text-slate-600'>Comments</span>
                {
                    comments?.map((comment) => {
                        return (
                            <CommentCard likeCount={comment.likeCount} isLiked={comment.isLiked} isPrivate={comment.isPrivate} author={comment.author} text={comment.text} commentId={comment.commentId} message={comment.message} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CommentSection