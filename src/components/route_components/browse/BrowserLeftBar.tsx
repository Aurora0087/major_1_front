import { Home, Send, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import IsAdmin from './Admin/IsAdmin'

function BrowserLeftBar() {
    return (
        <header className=' relative justify-end lg:flex md:min-w-[250px] hidden sm:flex' >
            <div className=' sticky top-0 h-screen w-full border-r-2 border-blue-500/75 flex flex-col gap-8 py-6 pb-12 text-white font-semibold bg-slate-800 px-4'>
                <div>
                    <Link className=' flex gap-2 items-center' to={"/browse"}>
                        <Home/><span className=' hidden md:flex'>Home</span>
                    </Link>
                </div>
                <div>
                    <Link className=' flex gap-2 items-center' to={"/browse/post/content"}>
                        <Send/><span className=' hidden md:flex'>Post video</span>
                    </Link>
                </div>
                <div>
                    <Link className=' flex gap-2 items-center' to={"/browse/profile"}>
                        <User/><span className=' hidden md:flex'>Profile</span>
                    </Link>
                </div>
                <div>
                    <IsAdmin/>
                </div>
            </div>
        </header>
    )
}

export default BrowserLeftBar