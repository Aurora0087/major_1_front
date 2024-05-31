
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authProps } from '@/lib/types/types'
import { Link, useNavigate } from 'react-router-dom'
import LoginButton from "./LoginButton"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import axios from "axios"



function AuthButton({ data, afterLogin }: authProps) {

    const router = useNavigate()

    function logout() {
        
        axios.get('/api/log-out').then((res) => {
            router("/")
        }).catch((e) => {
            console.log(e);
            
        })
    }

    return (
        <div className=" relative">
            {data === null || data === undefined ? (
                <div>
                    <LoginButton afterLogin={afterLogin} />
                </div>
            ) : (
                <div className=" relative w-full h-full" >

                    <Popover>
                        <PopoverTrigger>
                            <Avatar className=' border-2 border-transparent focus:border-green-400 hover:border-green-500'>
                                <AvatarImage className=' focus:opacity-90 hover:opacity-90 object-cover' src={data.avatar} />
                                <AvatarFallback>Us</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                            <PopoverContent className=" w-fit flex gap-2 flex-col">
                                <Link className=" bg-blue-500 hover:text-white w-full text-center p-2 rounded-md font-semibold" to={"/browse/profile/" + data?.uid}>
                                    Profile
                                </Link>
                                <Button onClick={()=>{logout()}} className=" w-fit">
                                    Logout
                                </Button>
                        </PopoverContent>
                    </Popover>

                </div>
            )}
        </div>
    )
}

export default AuthButton