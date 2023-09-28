

import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { articles } from '@/data/articles'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { formatTitle } from '@/utils/formatTitle'

export default async function Home() {

  const session = await getServerSession(options)
  // console.log(session)

  if (!session) {
    redirect('/')
  }

  return (
    <main className='w-full'>
      <ScrollArea >
        <div className='h-[calc(100vh-52px)] pt-10 -mb-5 flex flex-wrap gap-6 justify-center items-center'>
          {articles.map((item, index) => (
            <Card key={item.id} className='w-[300px] cursor-pointer backdrop:blur-md'>
              <CardHeader>
                <Avatar className='mb-5 w-8 h-8'>
                  <AvatarImage className="rounded-lg inline-block" src={item.avatar} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold dark:text-white/60">{formatTitle(item.title)}</h2>
              </CardHeader>
              <CardContent>
                <span className='text-xs text-slate-600 dark:text-white/60'>{item.time_stamp}</span>
                <Image width={280} height={200} className='rounded-md mt-4' src={item.img} alt='article thambnail'></Image>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}
