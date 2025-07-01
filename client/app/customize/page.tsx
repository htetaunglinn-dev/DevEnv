import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const CustomizePage = () => {
    return (
        <div className="w-full">
            <ScrollArea className='w-full'>
                <div className='h-[calc(100vh-52px)]'>
                    <p>Customize Page</p>
                </div>
            </ScrollArea>
        </div>
    )
}

export default CustomizePage