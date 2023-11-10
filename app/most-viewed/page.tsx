import { ScrollArea } from '@/components/ui/scroll-area'
import { mostViews } from '@/data/articles'
import BlogPost from '@/components/custom/BlogPost'

const MostViewedPage = () => {
    return (
        <div className='w-full'>
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Most Viewed</h2>
                <BlogPost data={mostViews} />
            </ScrollArea>
        </div>
    )
}

export default MostViewedPage