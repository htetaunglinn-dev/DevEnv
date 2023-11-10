
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatTitle } from '@/utils/formatTitle'

interface blogPostProps {
    id: number;
    avatar: string;
    title: string;
    time_stamp: string;
    img: StaticImageData;
}

interface dataProps {
    data: blogPostProps[]
}

const BlogPost = ({ data }: dataProps) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pt-10 p-10'>
            {data.map((item, index) => (
                <Link
                    href={{
                        pathname: '/view-post',
                        query: {
                            id: item.id
                        }
                    }}
                    key={item.id}
                >
                    <Card className='cursor-pointer backdrop-blur-sm bg-white/5 '>
                        <CardHeader>
                            <Avatar className='mb-5 w-8 h-8'>
                                <AvatarImage className="rounded-lg inline-block" src={item.avatar} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='h-[84px]'>
                                <h2 className="text-lg font-semibold dark:text-white/60">{formatTitle(item.title)}</h2>
                            </div>
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
    )
}

export default BlogPost