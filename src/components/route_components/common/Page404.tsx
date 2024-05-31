import { MoveLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
    return (
        <div className=' w-full h-full grid place-content-center p-4'>
            <h1 className=' p-6 bg-red-500 text-white font-bold text-4xl rounded-lg'>Page Do not exist.</h1>
            <Link className=' text-blue-500 text-xl w-full flex items-center gap-2 text-center p-6 hover:text-purple-400' to={"/"}>
                <MoveLeft />
                Go back to Home....
            </Link>
        </div>
    )
}

export default Page404