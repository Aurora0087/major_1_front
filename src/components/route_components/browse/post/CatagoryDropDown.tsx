import React, { startTransition, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

type DropdownProps = {
    value: string,
    onChangeHandeler: () => void
}

function CatagoryDropDown({ onChangeHandeler, value }: DropdownProps) {

    const [catagorys, setCatagorys] = useState<any[]>([])

    const [newCategory, setNewCategory] = useState('')

    const { toast } = useToast()

    function handleAddCategory() {
        axios.post('/api/add/category',
            {
                "category": newCategory
            }
        ).then((res) => {
            setCatagorys(res.data)
        }).catch((e) => {
            console.log(e);
            toast(
                {
                    description: "somthing gose wrong"
                }
            )
        })
    }

    useEffect(() => {
        axios.get('/api/get/categorys').then((res) => {
            setCatagorys(res.data)
        }).catch((e) => {
            console.log(e);
            toast(
                {
                    description: "somthing gose wrong"
                }
            )
        })

    }, [])

    return (
        <Select onValueChange={onChangeHandeler} defaultValue={value}>
            <SelectTrigger className="w-full text-slate-800">
                <SelectValue placeholder="Select Category" className='' />
            </SelectTrigger>
            <SelectContent className=' w-full border-b border-slate-500/50'>
                {
                    catagorys.length > 0 && catagorys.map((catagory) => (
                        <SelectItem
                            className=' text-black font-semibold border-b border-blue-500/50'
                            key={catagory.id} value={catagory.id.toString()}>{catagory.categoryName}</SelectItem>
                    ))
                }
                <AlertDialog>
                    <AlertDialogTrigger className=' w-full rounded-sm text-blue-500 hover:text-blue-700 bg-white py-4 px-2'>add catagory</AlertDialogTrigger>
                    <AlertDialogContent className=''>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type='text' placeholder='Category name' className='text-black' onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleAddCategory()}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
            <div className=" absolute bottom-0 right-0">
            <Toaster />
            </div>
        </Select>
    )
}

export default CatagoryDropDown