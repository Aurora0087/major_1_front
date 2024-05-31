
import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useToast } from "@/components/ui/use-toast"
import { ContentAdmin } from "@/lib/types/types"
import axios from "axios"
import { Toaster } from "@/components/ui/toaster"
import { DataTable } from "@/components/ui/DataTable"
import { Link } from "react-router-dom"

function AdminContent() {

    const { toast } = useToast()

    const columns: ColumnDef<ContentAdmin>[] = [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "isBlocked",
            header: "Blocked",
        },
        {
            accessorKey: "createdAt",
            header: "CreatedAt",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "authorId",
            header: "AuthorId",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {

                const content = row.original

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
                                onClick={() => navigator.clipboard.writeText(content.id)}
                            >
                                <Button className=' w-full' onClick={() => {
                                    changeContentState(content.id, !content.isBlocked)
                                }}>
                                    {
                                        content.isBlocked ? ("UnBlock") : ("Block")
                                    }
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            <Link className=' w-full text-center font-semibold' to={`/browse/content/${content.id}`}>
                                    View Content
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <Link className=' w-full text-center font-semibold' to={`/browse/profile/${content.id}`}>
                                    View Creater
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [contents, setContents] = React.useState<ContentAdmin[]>([])

    function changeContentState(id: string, blocked: boolean) {

        axios.post("/api/admin/content/state",
            {
                "vid": id,
                "newIsBlock": blocked
            }
        ).then((res) => {
            getContents()
            toast(
                {
                    description: res.data.message
                }
            )
        }).catch((e) => {
            console.log(e);
        })
    }

    function getContents() {
        axios.post("/api/admin/contents",
            {
                "ignore": "0",
                "limit": "100"
            }
        ).then((res) => {
            setContents(res.data.contents)
        }).catch((e) => {
            console.log(e);

        })

    }

    React.useEffect(() => {
        getContents()
    }, [])

    return (
        <div className=' bg-slate-800 overflow-hidden rounded-md p-4 text-white flex flex-col gap-4'>
            <h2 className=' font-semibold text-2xl'>
                Contents
            </h2>
            <Toaster />
            <div className='dark border border-white/10 rounded-md'>
                <DataTable columns={columns} data={contents} />
            </div>
        </div>
    )
}

export default AdminContent