'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ModeToggle } from "../ui/mode-toggle"
import { Button } from "../ui/button"
import BlackLogo from '@/public/BlackLogo.png'
import WhiteLogo from '@/public/WhiteLogo.png'
import { discoverData, contributeData, manageData } from "@/data/sidemenu"

//icons
import { IoNotificationsOutline } from 'react-icons/io5'
import { CalendarIcon } from "@radix-ui/react-icons"
import { CgMenuGridO } from 'react-icons/cg'
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { RiLogoutBoxRLine } from "react-icons/ri"

const Navbar = () => {

    const router = useRouter()

    return (
        <nav className="flex justify-between items-center border-b px-5 py-2" >
            <div>
                <Link href='/'>
                    <Image className="hidden dark:block " src={WhiteLogo} width={108} alt="DevEnvLogo" />
                    <Image className="block dark:hidden" src={BlackLogo} width={108} alt="DevEnvLogo" />
                </Link>
            </div>
            <div className="flex justify-center items-center gap-3">
                <Button className="hidden md:block" type="button" onClick={() => router.push('/post-article')} variant="outline">New post</Button>
                <ModeToggle />
                {/* Mobile Side Drawer */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger><Button className='px-3 py-3 md:hidden' variant={"outline"} >
                            <CgMenuGridO />
                        </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0 overflow-y-auto">
                            <div className="mt-10 p-6 h-[calc(100vh-52px)]  md:flex flex-col justify-between">
                                <section id="menu-section">
                                    {/* Discover */}
                                    <div className="flex flex-col dark:text-white/80">
                                        <h2 className="text-xs dark:text-white/60">Discover</h2>
                                        <ul className="my-4">
                                            {discoverData.map((item, index) => (
                                                <Link key={item.title} href={item.link}>
                                                    <SheetClose asChild>
                                                        <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 `}>
                                                            {item.icon}
                                                            <span >{item.title}</span>
                                                        </li>
                                                    </SheetClose>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Contribute */}
                                    <div className="mt-10 flex flex-col dark:text-white/80">
                                        <h2 className="text-xs dark:text-white/60">Contribute</h2>
                                        <ul className="my-4">
                                            {contributeData.map((item, index) => (
                                                <Link key={item.title} href={item.link}>
                                                    <SheetClose asChild>
                                                        <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 `}>
                                                            {item.icon}
                                                            <span >{item.title}</span>
                                                        </li>
                                                    </SheetClose>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Manage */}
                                    <div className="mt-10 flex flex-col dark:text-white/80">
                                        <h2 className="text-xs dark:text-white/60">Manage</h2>
                                        <ul className="my-4">
                                            {manageData.map((item, index) => (
                                                <Link key={item.title} href={item.link}>
                                                    <SheetClose asChild>
                                                        <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 `}>
                                                            {item.icon}
                                                            <span >{item.title}</span>
                                                        </li>
                                                    </SheetClose>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                                <footer className="py-4 dark:text-white/80 flex justify-between items-center">
                                    <div className="flex gap-2 items-center cursor-pointer">
                                        <Avatar>
                                            <AvatarImage width={36} className="rounded-lg inline-block" src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-xs mb-1">Htet Aung Linn</p>
                                            <p className="text-xs">Software Developer</p>
                                        </div>
                                    </div>
                                    <button className="p-2 dark:border shadow-md dark:border-gray-100/10 rounded-md"><RiLogoutBoxRLine size={20} className="dark:text-white" /></button>
                                </footer>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <HoverCard>
                    <HoverCardTrigger asChild >
                        <Button className="hidden md:block" variant="outline"><IoNotificationsOutline /></Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80" align={"center"} sideOffset={7}>
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage width={50} src="https://github.com/vercel.png" />
                                <AvatarFallback>VC</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">@nextjs</h4>
                                <p className="text-sm">
                                    Next.js is the best framework ever. Awesome
                                </p>
                                <div className="flex items-center pt-2">
                                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Created December 2021
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                <Avatar className="hidden md:block">
                    <AvatarImage width={36} className="rounded-lg inline-block" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

            </div>
        </nav>
    )
}

export default Navbar