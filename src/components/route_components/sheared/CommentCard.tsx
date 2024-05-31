import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Comment } from '@/lib/types/types'
import axios from 'axios'
import { MessageCircleMore, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CommentCard({
    isPrivate,
    message,
    commentId,
    text,
    author,
    likeCount,
    isLiked
}: Comment) {

    const router = useNavigate();
    const { toast } = useToast()

    const [userLiked, setUserLiked] = useState(isLiked)
    
    function likeComment() {
        axios.post(`/api/like/comment/${commentId}`).then((res) => {

            setUserLiked(!userLiked)
            console.log(res.data)
            toast(
                {
                    description: res.data.message
                }
            )
        }).catch((e) => {
            toast(
                {
                    description: e.response.data.message
                }
            )
        })
    }

    return (
        <div className=' w-full shadow-lg flex p-4 border rounded-lg'>
            {
                isPrivate ? (
                    <div>
                        Comment is privated
                    </div>
                ) : (
                    <div  className='flex flex-col gap-2 w-full'>
                        <div className=' flex gap-2 items-center w-full'>
                            <div>
                                <Avatar>
                                    <AvatarImage src={author.avatarUrl} />
                                    <AvatarFallback>{author.firstName[0] + author.lastName[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className=' bg-slate-100 text-sm py-2 px-4 w-full text-wrap rounded-sm h-full'>
                                {text}
                            </div>
                        </div>

                            <div className=' flex items-center justify-between px-6'>
                                <a href={`/browse/comment/${commentId}`} className='hover:text-blue-500'>
                                    <MessageCircleMore/>
                                </a>
                                
                                <Button onClick={(()=>{likeComment()})} variant={"ghost"} className='flex items-center gap-2'>
                                    <ThumbsUp className={`${userLiked?(" text-red-400"):("")}`} /><span>{likeCount}</span>
                                </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CommentCard