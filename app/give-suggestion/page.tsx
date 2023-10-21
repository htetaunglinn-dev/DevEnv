'use client'

import React from 'react'
import Image from 'next/image'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import whiteImg from '@/assets/suggestion/white1.jpg'
import darkImg from '@/assets/suggestion/dark1.jpg'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    message: z.string().min(2, {
        message: "Message must be at least 2 characters.",
    }),
})

const SuggestionPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: "",
            message: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    return (
        <div className="w-full">
            <ScrollArea className='w-full'>
                <div className='h-[calc(100vh-52px)] flex justify-center items-center'>
                    <Card className=' shadow-md w-fit lg:min-w-[50vw] flex '>
                        <div className='relative basis-6/12 w-full h-[500px] hidden lg:block'>
                            <Image className='rounded-xl object-cover object-right hidden dark:block shadow-md' src={darkImg} fill alt="suggestion" />
                            <Image className='rounded-xl object-cover object-right dark:hidden shadow-md' src={whiteImg} fill alt="suggestion" />
                        </div>
                        <div className='p-10 lg:basis-6/12 flex justify-center items-center'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Feedback</FormLabel>
                                                <FormControl>
                                                    <Textarea className='resize-none' rows={4} placeholder="Enter your feedback" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className='inline-block !mt-6'>Submit</Button>
                                </form>
                            </Form>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}

export default SuggestionPage