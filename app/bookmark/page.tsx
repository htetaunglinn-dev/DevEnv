'use client'


import React from 'react'
import Image from 'next/image'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { bestAuthors } from '@/data/articles'
import { formatTitle } from '@/utils/formatTitle'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import Link from 'next/link'

const BookmarkPage = () => {
    return (
        <div className="w-full">
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Bookmark</h2>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pt-10 p-10'>
                    {bestAuthors.map((item, index) => (
                        <Link href={{
                            pathname: '/view-post',
                            query: {
                                id: item.id
                            }
                        }}>
                            <Card key={item.id} className=' cursor-pointer backdrop-blur-sm bg-white/5'>
                                <CardHeader>
                                    <Avatar className='mb-5 w-8 h-8'>
                                        <AvatarImage className="rounded-lg inline-block" src={item.avatar} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-lg font-semibold dark:text-white/60">{formatTitle(item.title)}</h2>
                                </CardHeader>
                                <CardContent>
                                    <span className='text-xs text-slate-600 dark:text-white/60'>{item.time_stamp}</span>
                                    <div className='relative w-full h-[200px] rounded-md mt-4'>
                                        <Image loading='lazy' className='rounded-md object-cover object-center' fill src={item.img} alt='article thumbnail'></Image>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default BookmarkPage