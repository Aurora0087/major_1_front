import React from 'react'
import Title from '../common/Title'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function Testiomonal() {
    return (
        <>
            <section className=" p-6">
                <div className="flex flex-col gap-8">
                    <div className=' text-3xl font-bold'>
                        <Title subtitle="Feedbacks" title="Our successful students" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonal.map((val) => (
                            <div className=" p-4 rounded-md overflow-hidden shadow-md bg-slate-200">
                                <div className=" flex gap-4 items-center text-sm font-semibold text-slate-500 w-fit rounded-r-full bg-slate-300 p-2 pr-6">
                                    <div className="img">
                                        <Avatar className=' border-2 border-transparent focus:border-green-400 hover:border-green-500'>
                                            <AvatarImage className=' focus:opacity-90 hover:opacity-90 object-cover' src={val.cover} />
                                            <AvatarFallback>Us</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="name">
                                        <h2 className=' text-xl'>{val.name}</h2>
                                        <span className=' text-sm'>{val.post}</span>
                                    </div>
                                </div>
                                <p className=' text-sm font-semibold text-slate-600 p-4 shadow-lg border-2 border-blue-500/50 rounded-md mt-4'>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

const testimonal = [
    {
        id: 1,
        name: "ROGER SCOTT",
        post: "MARKETING MANAGER",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        cover: "./images/testo/t1.webp",
    },
    {
        id: 2,
        name: "ROGER SCOTT",
        post: "MARKETING MANAGER",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        cover: "./images/testo/t2.webp",
    },
    {
        id: 3,
        name: "ROGER SCOTT",
        post: "MARKETING MANAGER",
        desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        cover: "./images/testo/t3.webp",
    },
]

export default Testiomonal