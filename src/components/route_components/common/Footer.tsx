import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Mail, Map, MoveRight, Phone, Send, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className=' py-6 border-t-2 flex gap-4 flex-col bg-[#1eb2a6]'>
            <section className=' w-full py-4'>
                <div className=' flex gap-4 justify-between px-6 md:flex-row flex-col'>
                    <div className='text-white'>
                        <h1 className=' text-3xl'>Stay tune and get the latest update</h1>
                        <span className=' text-sm'>Far far away, behind the word mountains</span>
                    </div>
                    <div className='flex items-center w-full h-fit'>
                        <Input className=' rounded-l-full' placeholder='your@email' />
                        <Button className=' rounded-r-full hover:text-blue-500'>
                            <Send />
                        </Button>

                    </div>
                </div>
            </section>
            <footer>
                <div className='p-4 bg-slate-200 grid md:grid-cols-4 sm:grid-cols-2 gap-4'>
                    <div className='box logo'>
                        <h1 className=' text-3xl font-bold' >Knowledge Swap Junction</h1>
                        <span className=' text-xs text-[#1eb2a6]'>ONLINE EDUCATION & LEARNING</span>
                        <p className=' text-sm font-semibold text-slate-600 py-2'>Unlock limitless learning at Knowledge Swap Junction! Connect with experts, share insights, and explore a world of knowledge.
                            Join our vibrant community and elevate your skills today. Knowledge awaits—start your journey now!.
                        </p>
                        <div className=' flex gap-2 py-4'>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-blue-500 hover:border-blue-500" href="https://www.facebook.com/arpanmondal.mondal.9">
                                <Facebook />
                            </a>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-red-500 hover:border-red-500" href="https://www.instagram.com/being_ragazzo_semplice_/?hl=en">
                                <Instagram />
                            </a>
                            <a className=" bg-[#1eb2a6] text-white border-2 p-2 rounded-full hover:bg-slate-50 hover:text-red-500 hover:border-red-500" href="">
                                <Youtube />
                            </a>
                        </div>

                    </div>
                    <div className='box link'>
                        <h3 className=' text-xl font-semibold text-purple-500'>Explore</h3>
                        <ul className='flex flex-col gap-2 w-fit'>
                            <li className=' flex gap-2 hover:text-blue-500'>
                                <MoveRight className=' text-[#1eb2a6]'/>
                                <Link to="/about">About Us</Link></li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <MoveRight className=' text-[#1eb2a6]' />
                                <Link to="/browse">Courses</Link></li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <MoveRight className=' text-[#1eb2a6]' />
                                <Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className='box link'>
                        <h3 className=' text-xl font-semibold text-purple-500'>Quick Links</h3>
                        <ul className='flex flex-col gap-2 w-fit' >
                            <li className='flex gap-2 hover:text-blue-500'>
                                <MoveRight className=' text-[#1eb2a6]' /><Link to="/contact">Contact Us</Link></li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <MoveRight  className=' text-[#1eb2a6]'/>Terms & Conditions</li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <MoveRight  className=' text-[#1eb2a6]'/><Link to="/testiomonal">Feedback</Link></li>
                        </ul>
                    </div>
                    <div >
                        <h3 className=' text-xl font-semibold text-purple-500'>Have a Questions?</h3>
                        <ul className='flex flex-col gap-2 w-fit'>
                        <li className='flex gap-2 hover:text-blue-500'>
                                <Map className=' text-[#1eb2a6]'/>
                                N/5,Nawabhanga, Sector VI Chingrighata, 700108
                            </li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <Phone className=' text-[#1eb2a6]'/>
                                +91 9999999999
                            </li>
                            <li className='flex gap-2 hover:text-blue-500'>
                                <Mail className=' text-[#1eb2a6]'/>
                                demo@email.com
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className=' text-white p-4 font-semibold'>
                <p>
                    Copyright ©2022 All rights reserved | This template is made with <i className='fa fa-heart'></i> by Arpan & Friends
                </p>
            </div>
        </div>
    )
}

export default Footer