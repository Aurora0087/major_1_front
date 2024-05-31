import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convertToLocalTime } from '@/lib/commone'
import { contentCardProps } from '@/lib/types/types'
import { motion } from 'framer-motion'

import { Calendar, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

function ContentCard({
    category,
    createAt,
    description,
    likeList,
    price,
    thumbnailUrl,
    title,
    vid,
    author,
}: contentCardProps) {
    return (
        <Link to={"/browse/content/" + vid}>
            <div className=' shadow-md relative overflow-hidden bg-slate-700 rounded-md border-2 border-green-500/80 aspect-video'>
                <div className=' overflow-hidden w-full h-full'>
                    <img
                        src={thumbnailUrl}
                        alt='loading...'
                        className=' object-fill w-full h-full hover:scale-105 transition-all hover:opacity-90'
                    />
                </div>
                <motion.div
                    className=' p-4 absolute bottom-0 w-full left-0 flex flex-col gap-2 bg-gradient-to-r from-gray-900 to-transparent hover:bg-slate-700/70'>
                    <h1 className=' font-extrabold text-3xl text-white'>{title}</h1>
                    <p className='p-2 py-1 flex gap-2 text-slate-700/80 font-semibold w-fit bg-blue-400 rounded-full'>
                        <Calendar />
                        <span className=' text-white'>{convertToLocalTime(createAt)}</span>
                    </p>
                    <div className='flex gap-2'>
                        <div className=' p-2 border-r-2 border-white/40'>
                            <Link to={"/browse/profile/" + author.profileId}>
                                <Avatar className=' border-2 border-transparent focus:border-green-400 hover:border-green-500'>
                                    <AvatarImage className=' focus:opacity-90 hover:opacity-90' src={author.avatarUrl} />
                                    <AvatarFallback>{author.firstName}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <p className=' text-slate-400 font-bold'>
                                {"@" + author.userName}
                            </p>
                        </div>
                        <div className=' flex gap-4 justify-between items-center flex-wrap'>
                            <span className=' w-fit p-2 py-1 text-slate-700 font-semibold bg-green-400 rounded-full'>
                                {category}
                            </span>
                            <p className=' w-fit p-2 py-1 font-semibold bg-white/10 text-green-400 rounded-full'>
                                <span>₹</span>
                                {price}
                            </p>
                            <Link className=' p-2 rounded-full border-white border-2 text-white hover:text-red-400 hover:border-blue-400' to={`/browse/content/watch/${vid}`}>
                                <Play/>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Link>

    )
}

export default ContentCard