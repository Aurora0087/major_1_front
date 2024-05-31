import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useEffect, useState } from 'react'
import ContentCard from '../sheared/ContentCard';
import LoadContents from '../sheared/LoadContents';
import { videoContentsGetProps } from '@/lib/types/types';

function BrowseHome() {
    
    const { toast } = useToast()

    const [content, setContent] = useState<null | videoContentsGetProps>(null);

    const getValue = {
        ignore: '0',
        limit: '6'
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
        <div className=' p-4 flex-grow'>
            {
                content?.contents.length === 0 || content === null ? (
                    <>
                        <div className=' grid place-content-center text-center rounded-md font-extrabold text-3xl bg-slate-500/80 w-full p-4'>
                            <h1>Nothing to see here<span className=' text-red-400'>.</span></h1>
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
                            <LoadContents isNext={content.isMore} type="ALL" />
                    </>
                )
            }
        </div>
    )
}

export default BrowseHome