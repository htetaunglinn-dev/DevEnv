'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { ModeToggle } from "../ui/mode-toggle"
import { Button } from "../ui/button"
import { IoNotificationsOutline } from 'react-icons/io5'
import Image from "next/image"
import Link from "next/link"
import BlackLogo from '@/public/BlackLogo.png'
import WhiteLogo from '@/public/WhiteLogo.png'


const Navbar = () => {

    return (
        <nav className="flex justify-between items-center border-b px-5 py-2" >
            <div>
                <Link href='/'>
                    <Image className="hidden dark:block " src={WhiteLogo} width={108} alt="DevEnvLogo" />
                    <Image className="block dark:hidden" src={BlackLogo} width={108} alt="DevEnvLogo" />
                </Link>
            </div>
            <div className="flex justify-center items-center gap-3">
                <Button variant="outline">New post</Button>
                <ModeToggle />
                <Button className="hidden md:block" variant="outline"><IoNotificationsOutline /></Button>
                <Avatar className="hidden md:block">
                    <AvatarImage width={36} className="rounded-lg inline-block" src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    )
}

export default Navbar