import { ScrollArea } from "@/components/ui/scroll-area";
import { articles } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";

export default async function Home() {
  return (
    <main className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <BlogPost data={articles} />
      </ScrollArea>
    </main>
  );
}
