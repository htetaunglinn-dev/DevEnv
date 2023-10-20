import { ScrollArea } from '@/components/ui/scroll-area'
import { articles, technology } from '@/data/articles'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { formatTitle } from '@/utils/formatTitle'
import { useInfiniteQuery } from '@tanstack/react-query'
import { resolve } from 'path'

export default async function Home() {


  // React Query
  const fetchPost = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return articles.slice((page - 1) * 10, page * 10)
  }

  return (
    <main className='w-full'>
      <ScrollArea className='h-[calc(100vh-52px)]'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pt-10 p-10'>
          {articles.map((item, index) => (
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
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}