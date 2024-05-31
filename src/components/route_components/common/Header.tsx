import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Head from "./Head"
import React, { useEffect, useState } from "react";
import { apiUrl, cn } from "@/lib/utils";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import axios from "axios";
import AuthButton from "./AuthButton";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "All Contents",
        href: "/browse",
        description:
            "Browse all type of contents.",
    },
    {
        title: "Web Dev",
        href: "/browse/search/web",
        description:
            "Browse Web Dev Contents.",
    },
    {
        title: "Music",
        href: "/browse/search/music",
        description:
            "Browse Music Contents.",
    },
    {
        title: "Animation",
        href: "/browse/search/animation",
        description:
            "Browse Animation Contents.",
    },
]

function Header() {

    const [data, setData] = useState(null)

    function userAuth() {
        axios.get(`/api/auth`).then((res) => setData(res.data))
            .catch((e: any) => { })
    }

    useEffect(() => {
        userAuth()
    }, [])

    return (
        <div className=" border-b">
            <Head />
            <header className=" px-6 py-4 bg-slate-800 flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >

                                                <div className="mb-2 mt-4 text-lg font-medium flex gap-2 items-center">
                                                    Knowledge
                                                    <span className=" text-sm text-slate-600">
                                                        Swap Junction
                                                    </span>
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, vero.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/about" title="About us">
                                        Lorem ipsum dolor sit amet.
                                    </ListItem>
                                    <ListItem href="/team" title="Team">
                                        Team members
                                    </ListItem>
                                    <ListItem href="/testiomonal" title="Testiomonal">
                                        Testiomonals from our costomers
                                    </ListItem>
                                    <ListItem href="/contact" title="Contact us">
                                        faceing any problem
                                    </ListItem>
                                    <div className="flex gap-2 justify-end h-fit">
                                        <a target="_blank" className=" border-2 p-2 rounded-full hover:text-blue-500 hover:border-blue-500" href="https://www.facebook.com/arpanmondal.mondal.9">
                                            <Facebook />
                                        </a>
                                        <a target="_blank" className=" border-2 p-2 rounded-full hover:text-red-500 hover:border-red-500" href="https://www.instagram.com/being_ragazzo_semplice_/?hl=en">
                                            <Instagram />
                                        </a>
                                        <a target="_blank" className=" border-2 p-2 rounded-full hover:text-blue-500 hover:border-blue-500" href="">
                                            <Twitter />
                                        </a>
                                        <a target="_blank" className=" border-2 p-2 rounded-full hover:text-red-500 hover:border-red-500" href="">
                                            <Youtube />
                                        </a>
                                    </div>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className=" md:flex hidden">
                            <a href="/browse/post/content">
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Post New Content
                                </NavigationMenuLink>
                            </a>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className=" relative">
                    <AuthButton data={data} afterLogin={userAuth} />
                </div>
            </header>
        </div>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Header

