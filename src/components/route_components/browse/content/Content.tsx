import { useToast } from '@/components/ui/use-toast';
import { contentFindByIdProps } from '@/lib/types/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useRazorpay from "react-razorpay";
import { Calendar, ShoppingBag, ShoppingCart, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { convertToLocalTime } from '@/lib/commone';

function Content() {

    const location = useLocation()
    const id = location.pathname.split("/")[3]

    const [content, setContent] = useState<contentFindByIdProps | null>(null);
    const [isBuying, setIsBuying] = useState(false)
    const [Razorpay] = useRazorpay();
    const router = useNavigate();
    const { toast } = useToast()

    useEffect(() => {
        axios.get(`/api/get/videocontent/${id}`).then((res) => {
            setContent(res.data)
        })
            .catch((e) => {
                toast(
                    {
                        description: "somthing gose wrong while getting the content"
                    }
                )
            })
    }, [])

    function makePayment(data: any) {
        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: "Idk",
            description: "Test Transaction",
            image: content?.videoContent.thumbnailUrl,
            order_id: data.razorpayOrderId,
            handler: function () {
                router(`/browse/content/watch/${id}`)
            },
            prefill: {
                name: data.name,
                email: data.email,
                contact: "",
            },
            notes: {
                address: data.notes,
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response: any) {
            toast(
                {
                    description: response.error.reason
                }
            )
            setIsBuying(false)
        });
        setIsBuying(false)
        rzp1.open();
    }

    function makeOrder() {
        setIsBuying(true)
        axios.post(`/api/order/${id}`).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                makePayment(res.data)
            }
        })
            .catch((e) => {
                setIsBuying(false)
                toast(
                    {
                        description: "somthing want wrong while making order."
                    }
                )
            })
    }


    function addCart() {
        axios.post(`/api/cart/add/${id}`).then((res) => {
            toast(
                {
                    description: res.data.message
                }
            )
        }).catch((e) => {
            toast(
                {
                    description: "somthing want wrong while adding to cart."
                }
            )
        })
    }
    return (
        <div className='p-4'>
            <Toaster />
            {
                content === null ? (
                    <div className=' grid shadow place-content-center text-4xl font-extrabold bg-white/50 p-4 rounded-lg'>
                        <h1>No Content Found</h1>
                    </div>
                ) : (
                    <div className=' border-2 w-full h-fit p-2 py-4 rounded-lg bg-white grid md:grid-cols-2 gap-4'>
                        <div className=' w-full overflow-hidden rounded-lg'>
                            <img
                                src={content.videoContent.thumbnailUrl}
                                alt='none'
                                loading="lazy"
                                className=' w-full h-full object-cover'
                            />
                        </div>
                        <div className=' p-2 bg-green-400 rounded-lg flex flex-col gap-4'>
                            <h1 className=' font-extrabold text-4xl text-white'>{content.videoContent.title}</h1>
                            <p className=' rounded-md bg-slate-700/20 p-2 hover:bg-slate-700/40'>
                                {content.videoContent.description}
                            </p>
                            <p className='p-2 py-1 flex gap-2 font-semibold w-fit bg-purple-400 rounded-full'>
                                <Calendar />
                                <span className=' text-white'>{convertToLocalTime(content.videoContent.createAt)}</span>
                            </p>
                            <div className=' flex justify-between items-center'>
                                <p className='p-2 py-1 flex gap-2 font-semibold w-fit bg-white text-green-400 hover:text-purple-500 rounded-full'>{content.videoContent.category}</p>
                                <p className='p-2 py-1 flex gap-2 font-semibold w-fit text-white rounded-full hover:text-red-400 hover:bg-white'>
                                    <ThumbsUp className='' />
                                    {content.videoContent.likeList.length}
                                </p>
                            </div>
                            <Button disabled={isBuying} onClick={makeOrder} className='flex gap-2 hover:cursor-pointer focus:cursor-pointer'>
                                <ShoppingBag />
                                {"₹ " + content.videoContent.price}
                            </Button>
                            <Button onClick={addCart} className='flex gap-2 hover:cursor-pointer focus:cursor-pointer'>
                                <ShoppingCart />
                                <span>add to cart</span>
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Content