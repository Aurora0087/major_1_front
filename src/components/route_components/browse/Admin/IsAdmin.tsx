import axios from 'axios'
import { UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function IsAdmin() {

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        axios.get("/api/admin").then((res) => {
            setIsAdmin(true)
        }).catch((e) => {
            
        })
    },[])


    return (
        <div className=' text-red-400'>
            {
                isAdmin && (
                    <Link className=' flex gap-2 items-center' to={"/browse/admin"}>
                        <UserCog /><span className=' hidden md:flex'>Admin</span>
                    </Link>
                )
            }
        </div>
    )
}

export default IsAdmin