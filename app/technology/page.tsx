import { ScrollArea } from '@/components/ui/scroll-area'
import { technology } from '@/data/articles'
import BlogPost from '@/components/custom/BlogPost'

const TechnologyPage = () => {
    return (
        <div className='w-full'>
            <ScrollArea className='h-[calc(100vh-52px)]'>
                <h2 className='pt-5 pl-6 font-semibold'>Technology</h2>
                <BlogPost data={technology} />
            </ScrollArea>
        </div>
    )
}

export default TechnologyPage