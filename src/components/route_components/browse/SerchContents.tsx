import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { decodeUrlString } from '@/lib/commone'
import { videoContentsGetProps } from '@/lib/types/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentCard from '../sheared/ContentCard';
import LoadContents from '../sheared/LoadContents';

function SerchContents() {

    const location = useLocation()
    const topic = decodeUrlString(location.pathname.split("/")[3])
    const [content, setContent] = useState<null | videoContentsGetProps>(null);
    const { toast } = useToast()

    const getValue = {
        ignore: '0',
        limit: '6'
    }

    useEffect(() => {
        axios.post(`/api/search/${topic}`, getValue).then((res) => {
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
        <div className=' p-4 w-full'>
            {
                content?.contents.length === 0 || content === null ? (
                    <>
                        <div className=' grid place-content-center text-center rounded-md font-extrabold text-3xl bg-slate-500/80 w-full p-4'>
                            <h1>No content found<span className=' text-red-400'>.</span></h1>
                        </div>
                        <Toaster />
                    </>
                ) : (
                    <>
                        <div className=' w-full grid md:grid-cols-2 gap-6'>
                            {
                                content?.contents.map((c) => {
                                    return (
                                        <ContentCard
                                            category={c.category}
                                            createAt={c.createAt}
                                            description={c.description}
                                            likeList={c.likeList}
                                            price={c.price}
                                            thumbnailUrl={c.thumbnailUrl}
                                            title={c.title}
                                            vid={c.vid}
                                            author={c.author}
                                        />
                                    )
                                })
                            }
                            </div>
                            <LoadContents isNext={content.isMore} topic={topic} type="SEARCH" />
                    </>
                )
            }
        </div>
    )
}

export default SerchContents