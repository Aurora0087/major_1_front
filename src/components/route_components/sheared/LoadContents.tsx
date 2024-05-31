import axios from "axios"
import { Dot, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer'
import ContentCard from "./ContentCard"


interface loadPostsProp {
    isNext: boolean,
    topic?: string,
    type: "ALL" | "SEARCH"
}

function LoadContents({ isNext, topic, type }: loadPostsProp) {

    const [load, setLoad] = useState(isNext)
    const [ref, inView, entry] = useInView()
    const [contents, setContents] = useState<any[]>([])
    const [ignoreValue, setIgnoreValue] = useState(6)
    const [limitValue, setLimitValue] = useState(6)

    function fData() {
        if (type === "SEARCH") {
            axios.post(`/api/search/${topic}`,
                {
                    ignore: ignoreValue.toString(),
                    limit: limitValue.toString()
                }
            ).then((res) => {
                setContents([...contents, ...res.data.contents])
                setIgnoreValue((i) => i + 6)
                setLimitValue((l) => l + 6)
                setLoad(res.data.isMore)
            })
                .catch((e) => {
                })
        }
        else if (type === "ALL") {
            axios.post("/api/get/videocontents",
                {
                    ignore: ignoreValue.toString(),
                    limit: limitValue.toString()
                }
            ).then((res) => {
                setContents([...contents, ...res.data.contents])
                setIgnoreValue((i) => i + 6)
                setLimitValue((l) => l + 6)
                setLoad(res.data.isMore)
            })
                .catch((e) => {
                })
        }
    }


    useEffect(() => {
        if (inView && load && entry?.isIntersecting) {
            fData()
        }
    }, [inView])
    return (
        <div className='mt-6'>
            {
                contents.length > 0 ? (
                    <div  className=' w-full grid md:grid-cols-2 gap-6'>
                        {
                            contents.map((c) => {
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
                ) : (
                    <div/>
                )
            }
            {
                load ? (
                    <div ref={ref} className='grid place-content-center'>
                        <Loader2 className=' animate-spin' />
                    </div>
                ) : (
                    <div className='grid place-content-center'>
                        <Dot />
                    </div>
                )
            }
        </div>
    )
}

export default LoadContents