import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminLayout() {

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        axios.get("/api/admin").then((res) => {
            setIsAdmin(true)
        }).catch((e) => {

        })
    }, [])

    return (
        <div>
            {
                isAdmin ? (
                    <div className=' w-full min-h-screen bg-slate-700 p-12 flex flex-col gap-4 overflow-x-hidden'>
                        <h1 className=' font-semibold text-white text-4xl'>Admin Panel</h1>
                        <AdminNav/>
                        <div className=' py-4 border-t-2'>
                            <Outlet/>
                        </div>
                    </div>
                ) : (
                    <div className=' w-full p-6 text-3xl font-semibold'>
                        You are not Addmin.
                    </div>
                )
            }
        </div>
    )
}

function AdminNav() {
    return (
        <head className=' w-full grid grid-flow-col gap-4 bg-white p-8 py-2 rounded-md font-semibold text-blue-500'>
            <Link className=' text-center rounded-sm p-1 hover:bg-slate-700 hover:text-white bg-slate-200' to="/browse/admin">Users</Link>
            <Link className=' text-center rounded-sm p-1 hover:bg-slate-700 hover:text-white bg-slate-200' to="/browse/admin/content">Contents</Link>
            <Link className=' text-center rounded-sm p-1 hover:bg-slate-700 hover:text-white bg-slate-200' to="/browse/admin/content">Feedbacks</Link>
        </head>
    )
}

export default AdminLayout