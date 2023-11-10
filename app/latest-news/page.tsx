import BlogPost from '@/components/custom/BlogPost'
import { ScrollArea } from '@/components/ui/scroll-area'
import { latestNews } from '@/data/articles'

const LatestNewsPage = () => {
    return (
        <div className='w-full'>
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Latest News</h2>
                <BlogPost data={latestNews} />
            </ScrollArea>
        </div>
    )
}

export default LatestNewsPage