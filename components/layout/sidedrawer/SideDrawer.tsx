'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from 'next/navigation'


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { discoverData, contributeData, manageData } from "@/data/sidemenu"

//icons
import { BiSolidLeftArrow } from 'react-icons/bi'
import { RiLogoutBoxRLine } from 'react-icons/ri'


const SideDrawer = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <ScrollArea className={`${isExpanded ? 'w-68' : 'w-fit'} border-r border-gray-300/50 dark:border-gray-300/10 `}>
            <div className="hidden h-[calc(100vh-52px)] p-4 md:flex flex-col justify-between">
                <section id="menu-section">
                    <div className=" flex justify-between items-center gap-2">
                        <div className={`${isExpanded ? 'w-full' : 'hidden'}`}>
                            <Input name="search" placeholder="Search" className="focus-visible:ring-gray-100/20" />
                        </div>
                        <button className="p-2 dark:border shadow-md dark:border-gray-100/10 rounded-md" onClick={handleToggleExpand}>
                            {<BiSolidLeftArrow size={20} className={`dark:text-white transition ${isExpanded ? '' : 'rotate-180'}`} />}
                        </button>
                    </div>
                    {/* Discover */}
                    <div className="mt-10 flex flex-col dark:text-white/80">
                        <h2 className="text-xs dark:text-white/60">Discover</h2>
                        <ul className="my-4">
                            {discoverData.map((item, index) => (
                                <Link key={item.title} href={item.link}>
                                    <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 ${isExpanded ? 'w-full' : 'w-fit'} ${pathname === item.link ? 'dark:bg-gray-100/5 bg-gray-200/60' : ''}}`}>
                                        {item.icon}
                                        <span className={`${isExpanded ? 'w-full' : 'w-0 hidden'}`}>{item.title}</span>
                                    </li>
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
                                    <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 ${isExpanded ? 'w-full' : 'w-fit'} ${pathname === item.link ? 'dark:bg-gray-100/5 bg-gray-200/60' : ''}`}>
                                        {item.icon}
                                        <span className={`${isExpanded ? 'w-full' : 'w-0 hidden'}`}>{item.title}</span>
                                    </li>
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
                                    <li className={`rounded-md flex items-center p-2 gap-4 cursor-pointer hover:bg-gray-200/20 ${isExpanded ? 'w-full' : 'w-fit'} ${pathname === item.link ? 'dark:bg-gray-100/5 bg-gray-200/60' : ''}}`}>
                                        {item.icon}
                                        <span className={`${isExpanded ? 'w-full' : 'w-0 hidden'}`}>{item.title}</span>
                                    </li>
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
                        {isExpanded ?
                            (<div>
                                <p className="text-xs mb-1">Htet Aung Linn</p>
                                <p className="text-xs">Software Developer</p>
                            </div>) :
                            null}
                    </div>
                    {isExpanded ? <button className="p-2 dark:border shadow-md dark:border-gray-100/10 rounded-md"><RiLogoutBoxRLine size={20} className="dark:text-white" /></button> : null}
                </footer>
            </div>
        </ScrollArea>
    );
};

export default SideDrawer