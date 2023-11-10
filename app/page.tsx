import { ScrollArea } from '@/components/ui/scroll-area'
import { articles } from '@/data/articles'
import BlogPost from '@/components/custom/BlogPost'

export default async function Home() {

  // React Query
  const fetchPost = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return articles.slice((page - 1) * 10, page * 10)
  }

  return (
    <main className='w-full'>
      <ScrollArea className='h-[calc(100vh-52px)]'>
        <BlogPost data={articles} />
      </ScrollArea>
    </main>
  )
}