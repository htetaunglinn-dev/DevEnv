import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username..." },
                password: { label: "Password", type: "password", placeholder: 'Enter your password...' }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "htetaunglinn", email: "htetaunglin@gmail.com" }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
}