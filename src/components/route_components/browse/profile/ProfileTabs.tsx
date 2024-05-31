import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { videoContentsGetProps } from "@/lib/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import ContentCard from "../../sheared/ContentCard"
import LoadContents from "../../sheared/LoadContents"
import { Button } from "@/components/ui/button"
import useRazorpay from "react-razorpay"


function ProfileTabs({ uid, canChange }: { uid: string | number, canChange: boolean }) {
    return (
        <div className=" w-full">
            <Tabs defaultValue="contents" className="dark w-full">
                <TabsList className=" w-full flex">
                    <TabsTrigger className=" flex-grow" value="contents">Uploded Contents</TabsTrigger>
                    <TabsTrigger className=" flex-grow" value="cart">Cart</TabsTrigger>
                </TabsList>
                <TabsContent value="contents">
                    <GetUsersUploadedContents id={uid} />
                </TabsContent>
                <TabsContent value="cart">
                    <GetUsersCartItems isUser={canChange} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function GetUsersUploadedContents({ id }: { id: string | number }) {

    const { toast } = useToast()

    const [contents, setContents] = useState<null | videoContentsGetProps>(null)

    const getValue = {
        ignore: '0',
        limit: '6'
    }

    useEffect(() => {
        axios.post(`/api/get/uploaded/contents/${id}`, getValue).then((res) => {
            setContents(res.data)
        })
            .catch((e) => {
                toast(
                    {
                        description: "somthing want wrong"
                    }
                )
            })
    }, [])

    return (
        <div>
            {
                contents?.contents.length === 0 || contents === null ? (
                    <>
                        <div className=' grid place-content-center text-center rounded-md font-extrabold text-3xl bg-slate-500/80 w-full p-4'>
                            <h1>Nothing to see here.<span className=' text-red-400'>.</span></h1>
                        </div>
                        <Toaster />
                    </>
                ) : (
                    <>
                        <div className=' w-full grid md:grid-cols-2 gap-6'>
                            {
                                contents?.contents.map((c) => {
                                    return (
                                        <ContentCard
                                            category={c.category}
                                            createAt={c.createAt}
                                            description={c.description}
                                            likeList={c.likeList}
                                            price={c.price}
                                            thumbnailUrl={c.thumbnailUrl}
                                            title={c.title}
                                            vid={c.vid}
                                            author={c.author}
                                        />
                                    )
                                })
                            }
                        </div>
                        <LoadContents isNext={contents!.isMore} type="ALL" />
                    </>
                )
            }
        </div>
    )
}

function GetUsersCartItems({ isUser }: { isUser: boolean }) {

    const { toast } = useToast()

    const [items, setItems] = useState<any[]>([])

    const [isBuying, setIsBuying] = useState(false)
    const [Razorpay] = useRazorpay();

    function getItems() {
        if (isUser) {
            axios.get(`/api/cart/get`).then((res) => {
                setItems(res.data)
                console.log(res.data);
                
            })
                .catch((e) => {
                    toast(
                        {
                            description: "somthing want wrong"
                        }
                    )
                })
        }
    }

    function removeCartItem( itemId:string ) {
        if (isUser) {

            console.log(itemId);
            
            axios.delete(`/api/cart/delete/${itemId}`).then((res) => {
                getItems()
                toast(
                    {
                        description: "Item removed."
                    }
                )
            })
                .catch((e) => {
                    console.log(e);
                    
                    toast(
                        {
                            description: "somthing want wrong"
                        }
                    )
                })
        }
    }

    function makePayment(data: any) {
        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: "Idk",
            description: "Test Transaction",
            image: "",
            order_id: data.razorpayOrderId,
            handler: function () {
                
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
        axios.post(`/api/cart/order`).then((res) => {
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

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            {
                isUser ? (
                    <div>
                        {
                            items.length === 0 ? (
                                <div>Emty cart</div>
                            ) : (
                                <div>
                                    <Toaster />
                                    <div className=" flex justify-between p-4 px-6 w-full bg-slate-700/50 text-center rounded-sm capitalize font-semibold">
                                        <span className=" flex-grow" >contentId</span>
                                        <span className=" flex-grow">contentTitle</span>
                                        <span className=" flex-grow">price</span>
                                        <span className=" flex-grow">....</span>
                                    </div>
                                    {
                                        items.map((item) => {
                                            return (
                                                <div className=" shadow-lg flex justify-between text-center p-4 px-6 w-full">
                                                    <a href={`/browse/content/${item.contentId}`} className=" flex-grow">{item.contentId}</a>
                                                    <a href={`/browse/content/${item.contentId}`} className=" flex-grow">{item.contentTitle}</a>
                                                    <span className=" flex-grow">{item.price}</span>
                                                    <Button onClick={() => removeCartItem(item.itemId)}>Remove</Button>
                                                </div>
                                            )
                                        })
                                        }
                                        <div className=" w-full p-4">
                                            <Button disabled={isBuying} onClick={()=>makeOrder()} className=" w-full flex gap-2 items-center">
                                                Buy All
                                            </Button>
                                        </div>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        nothing
                    </div>
                )
            }
        </div>
    )
}

export default ProfileTabs