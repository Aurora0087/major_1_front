import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/lib/types/types'
import axios from 'axios'
import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProfileTabs from './ProfileTabs'

function Profile() {

    const location = useLocation()
    const id = location.pathname.split("/")


    const [userDetails, setUserDetails] = useState<null | UserProfile>(null)

    function getProfile() {
        const url = id.length === 4 ? `/api/profile/${id[3]}` : `/api/profile`
        axios.get(url).then((res) => {
            setUserDetails(res.data)
            console.log(res.data);

        }).catch((e) => {

        })
    }

    useEffect(() => {

        getProfile()
    }, [])

    return (
        <div className=' p-12 px-6 flex flex-col bg-slate-700 min-h-screen'>{
            userDetails === null ? (
                <div>{id.length}
                    Not found User
                </div>
            ) : (
                <>
                    <div className=' rounded-t-lg overflow-hidden w-full h-60 bg-blue-400 aspect-video'>
                        {
                            userDetails.bgImage.length > 0 ? (
                                <img src={userDetails?.bgImage} alt="bg image...." className=' w-full h-full object-cover' />
                            ) : (
                                ""
                            )
                        }

                    </div>
                    <div className=' relative p-4 bg-slate-800 text-white'>
                        {
                            userDetails.canChange && (
                                <div className=' w-full flex justify-end'>
                                    <Link to={`/browse/profile/edit`}>
                                        <Button className='dark rounded-full'>
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }
                        <div className=' absolute top-[-2.5rem]'>
                            <Avatar className=' h-20 w-20 aspect-square border-2 border-green-400'>
                                <AvatarImage className=' object-cover' src={userDetails?.avatarUrl} />
                                <AvatarFallback>{userDetails?.firstName[0] + userDetails?.lastName[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className=' mt-5'>
                            <div className=' flex gap-2 flex-col'>
                                <div>
                                    <span className=' font-semibold'>{` ${userDetails.firstName} ${userDetails.lastName}`}</span>
                                </div>
                                <div>
                                    {
                                        userDetails.email !== null ? (
                                            <span className=' text-slate-400 font-semibold'>{` ${userDetails.email}`}</span>
                                        ) : ("........")
                                    }
                                </div>
                                <div className=' rounded-lg overflow-hidden p-4 text-sm'>
                                    {userDetails.bio.length > 0 ? (userDetails.bio) : (
                                        <span className=' text-slate-500'>
                                            no bio yet...
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <ProfileTabs uid={userDetails.profileId} canChange={userDetails.canChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        </div>
    )
}

export default Profile