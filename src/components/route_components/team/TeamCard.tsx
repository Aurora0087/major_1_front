import { Facebook, Instagram, Youtube } from 'lucide-react'
import React from 'react'

function TeamCard() {
    return (
        <>
        {
            team.map((val) => (
                <div className=' p-4 shadow-md border bg-slate-200 rounded-lg'>
                    <div className='img'>
                        <img src={val.cover} alt='' />
                        <div className=' flex gap-2 py-4'>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-blue-500 hover:border-blue-500" href="">
                                <Facebook />
                            </a>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-red-500 hover:border-red-500" href="">
                                <Instagram />
                            </a>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-red-500 hover:border-red-500" href="">
                                <Youtube />
                            </a>
                        </div>
                    </div>
                    <div className='details'>
                        <h2 className=' text-2xl'>{val.name}</h2>
                        <p className=' text-sm font-semibold text-slate-600'>{val.work}</p>
                    </div>
                </div>
            ))
        }
        </>
        
    )
}

const team = [
    {
        cover: "./images/team/arpan.jpg",
        name: "Arpan Mondal",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/debojyoti.jpg",
        name: "Ph.D Debojyoti Naskar",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/syed.jpg",
        name: "Ph.D Syed Azmine Rahaman",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/sayan.jpg",
        name: "Ph.D Sayan Sikdar",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/akash.jpg",
        name: "Ph.D Akash Roy Chowdhury",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/t6.webp",
        name: "Ph.D Arthur MaGregor",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/t7.webp",
        name: "Ph.D Anna Hanzen",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
    {
        cover: "./images/team/t8.webp",
        name: "Ph.D Brian Wooden",
        work: "DEVELOPER AND LEAD INSTRUCTOR",
    },
]

export default TeamCard