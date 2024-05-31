import React from 'react'
import AWrapper from '../about/AWrapper'
import TeamCard from './TeamCard'

function Team() {
    return (
        <>
            <section className=' p-6'>
                <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <TeamCard />
                </div>
            </section>
            <AWrapper />
        </>
    )
}

export default Team