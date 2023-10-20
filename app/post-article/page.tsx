'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { RiDragDropLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { useState } from "react"

const PostArticlePage = () => {

    const [showUpload, setShowUpload] = useState(true)

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const imageView = document.getElementById('img-label') as HTMLDivElement
        //avoiding null value
        if (!e.target.files) return

        let file = e.target.files[0];
        let imgLink = URL.createObjectURL(file)
        imageView.style.backgroundImage = `url(${imgLink})`
        setShowUpload(false)
    }

    const clearBgImage = () => {
        const imageView = document.getElementById('img-label') as HTMLDivElement
        imageView.style.backgroundImage = ''
        setShowUpload(true)
    }

    return (
        <div className="w-full">
            <ScrollArea className='w-full'>
                <div className="flex justify-center items-center h-[calc(100vh-52px)]">
                    <Tabs defaultValue="create" className="md:w-[60%]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="create">Create a post</TabsTrigger>
                            <TabsTrigger value="share">Share a post</TabsTrigger>
                        </TabsList>
                        <TabsContent value="create">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create a post</CardTitle>
                                    <CardDescription>
                                        What would you like to post?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 ">
                                    <div className="space-y-1 w-fit relative">
                                        <Label id="img-label" className={`relative flex justify-center items-center cursor-pointer border w-[200px] h-[140px] rounded-2xl bg-center bg-cover bg-no-repeat`} htmlFor="thumbnail">
                                            <div className={`flex items-center gap-2 ${showUpload ? '' : 'hidden pointer-events-none'}`}>
                                                <Input onChange={uploadImage} disabled={!showUpload} className="hidden" type="file" id="thumbnail" />
                                                <RiDragDropLine className='inline-block' size={20} />
                                                <p className="inline-block"> Upload Thumbnail </p>
                                            </div>
                                        </Label>
                                        {showUpload ? null :
                                            (
                                                <Button onClick={clearBgImage} className="absolute z-10 bg-gray-50/10 drop-shadow backdrop:blur-md dark:text-white text-black hover:bg-gray-300/20 rounded-full w-[30px] h-[30px] p-0 -top-3 -right-3"><RxCross2 /></Button>
                                            )
                                        }
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="post-title">Post Title</Label>
                                        <Input id="post-title" placeholder="Enter your post title" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="paragraph">Share your content</Label>
                                        <Textarea id="paragraph" rows={4} placeholder="Enter your post content" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Create post</Button>

                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="share">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Share a post</CardTitle>
                                    <CardDescription>
                                        What would you like to share?
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="post-title">Post URL</Label>
                                        <Input type="url" id="post-title" placeholder="Enter your post url" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="paragraph">Share your content</Label>
                                        <Textarea id="paragraph" rows={11} placeholder="Enter your post content" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Share post</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </ScrollArea>
        </div >
    )
}

export default PostArticlePage