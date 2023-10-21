'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ModeToggle } from "../ui/mode-toggle"
import { Button } from "../ui/button"
import BlackLogo from '@/public/BlackLogo.png'
import WhiteLogo from '@/public/WhiteLogo.png'

//icons
import { IoNotificationsOutline } from 'react-icons/io5'
import { CalendarIcon } from "@radix-ui/react-icons"

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
                <Button type="button" onClick={() => router.push('/post-article')} variant="outline">New post</Button>
                <ModeToggle />
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