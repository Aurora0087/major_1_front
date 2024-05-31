import { Home, Send, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function BrowseBotBar() {
    return (
        <div className=' w-full fixed bottom-0 h-fit overflow-hidden flex md:hidden lg:hidden flex-nowrap justify-between items-center bg-slate-800 text-white py-3 px-6'>
            <Link className=' w-fit' to="/browse">
                <Home/>
            </Link>
            <Link className=' w-fit' to="/browse/post/content">
                <Send/>
            </Link>
            <Link className=' w-fit' to="/browse/profile">
                <User/>
            </Link>
        </div>
    )
}

export default BrowseBotBar