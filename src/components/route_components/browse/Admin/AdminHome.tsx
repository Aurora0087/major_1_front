import { DataTable } from '@/components/ui/DataTable'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { UserDetails } from '@/lib/types/types'
import { ColumnDef } from '@tanstack/react-table'
import axios from 'axios'
import { MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function AdminHome() {

    const { toast } = useToast()


    const columns: ColumnDef<UserDetails>[] = [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "userName",
            header: "Email",
        },
        {
            accessorKey: "firstName",
            header: "firstName",
        },
        {
            accessorKey: "lastName",
            header: "lastName",
        },
        {
            accessorKey: "locked",
            header: "locked",
        },
        {
            accessorKey: "enabled",
            header: "enabled",
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original
    
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(user.id)}
                            >
                                {
                                    user.locked ? (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,false,user.enabled,user.role)
                                        }}>UnLock Acc.</Button>
                                    ): (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,true,user.enabled,user.role)
                                        }}>Lock Acc.</Button>
                                    )
                                }
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            {
                                    user.enabled ? (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,user.locked,user.enabled,user.role)
                                        }}>UnEnable Acc.</Button>
                                    ): (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,user.locked,user.enabled,user.role)
                                        }}>Enable Acc.</Button>
                                    )
                                }
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            {
                                    user.role === "ADMIN" ? (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,user.locked,user.enabled,"USER")
                                        }}>Make User</Button>
                                    ): (
                                        <Button className=' w-full' onClick={()=>{ChageUserPermition(user.id,user.locked,user.enabled,"ADMIN")
                                        }}>Make Admin</Button>
                                    )
                                }
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link className=' w-full text-center font-semibold' to={`/browse/profile/${user.id}`}>
                                    View Profile
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [users, setUsers] = useState<UserDetails[]>([])

    function ChageUserPermition(id: string, locked: boolean, enabled: boolean, role: string) {
    
        axios.post("/api/admin/update/usersPermissions",
            {
                "userPermissions": [
                    {
                        "id": id,
                        "locked": locked,
                        "enabled": enabled,
                        "role": role,
                    },
                ],
                
            }
        ).then((res) => {
            
            getusers()
            toast(
                {
                    description: res.data.message
                }
            )
        }).catch((e) => {
            console.log(e);
            
        })
    }

    function getusers() {
        
        axios.post("/api/admin/getusers",
            {
                "ignore": "0",
                "limit":"100"
            }
        ).then((res) => {
            setUsers(res.data.userLists)
        }).catch((e) => {
            console.log(e);
            
        })
    }
    
    useEffect(() => {
        getusers()
    },[])

    return (
        <div className=' bg-slate-800 overflow-hidden rounded-md p-4 text-white flex flex-col gap-4'>
            <h2 className=' font-semibold text-2xl'>
                Users
            </h2>
            <Toaster/>
            {/*<div className=' flex justify-end px-4 gap-4'>
                <Button>+ Add User</Button>
                <Button>+ Add New Admin</Button>
    </div>*/}
            <div className='dark border border-white/10 rounded-md'>
            <DataTable columns={columns} data={users}/>
            </div>
        </div>
    )
}

export default AdminHome