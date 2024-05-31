import React from 'react'
import { Outlet } from 'react-router-dom'
import BrowseHeader from './BrowseHeader'
import BrowserLeftBar from './BrowserLeftBar'
import BrowseBotBar from './BrowseBotBar'
import AuthWrapper from '@/components/ui/AuthWrapper'

function BrowseLayOut() {
    return (
        <div className=" bg-slate-100 w-screen min-h-screen">
            <BrowseHeader />
            <div className='min-h-screen w-screen flex flex-row relative'>
                <BrowserLeftBar />
                <main className=' w-full overflow-hidden'>
                    <AuthWrapper>
                        <Outlet />
                    </AuthWrapper>
                </main>
                <BrowseBotBar/>
            </div>
        </div>
    )
}

export default BrowseLayOut