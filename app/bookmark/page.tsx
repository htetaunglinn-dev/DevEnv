'use client'

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { bestAuthors } from '@/data/articles'
import BlogPost from '@/components/custom/BlogPost'

const BookmarkPage = () => {
    return (
        <div className="w-full">
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Bookmark</h2>
                <BlogPost data={bestAuthors} />
            </ScrollArea>
        </div>
    )
}

export default BookmarkPage