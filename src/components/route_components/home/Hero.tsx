import { Button } from '@/components/ui/button'
import Title from '../common/Title'
import { MoveRight } from 'lucide-react'

function Hero() {
    return (
        <>
            <section className=' py-12 border-b-2 pb-6 border-blue-500'>
                <div className="container">
                    <div className="flex flex-col">
                        <div className=' text-6xl font-bold flex'>
                            <Title subtitle="WELCOME TO " title="KNOWLEDGE SWAP JUNCTION" />
                        </div>

                        <p className=' text-sm py-6 text-slate-500'>
                            "Unlock boundless learning potential at Knowledge Swap Junction - Where knowledge meets innovation, and curiosity sparks endless possibilities. Join us on the journey to personal and professional growth today!"
                        </p>
                        <div className=" flex gap-2">
                            <a href="loginsignup">
                                <Button variant={"link"} className=' flex gap-2 items-center bg-blue-500 text-white'>
                                    <span> Get Started</span> <MoveRight />
                                </Button>
                            </a>

                            <a href="/browse">
                                <Button variant={"link"} className=" flex gap-2 items-center">
                                    <span>View Courses</span> <MoveRight />
                                </Button>
                            </a>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero