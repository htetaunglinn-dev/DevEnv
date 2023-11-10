'use client'

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { populars } from '@/data/articles'
import BlogPost from '@/components/custom/BlogPost'

const ReadingHistoryPage = () => {
    return (
        <div className="w-full">
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Reading History</h2>
                <BlogPost data={populars} />
            </ScrollArea>
        </div>
    )
}

export default ReadingHistoryPage