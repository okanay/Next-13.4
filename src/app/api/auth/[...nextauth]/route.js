import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {joseSignUserPayload} from "@/lib/jwt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({

            name: "Credentials",
            async authorize(credentials, req) {

                const body = JSON.stringify({
                    username: credentials?.username,
                    password: credentials?.password
                })

                const user = {id: "1", name: "J Smith", email: "jsmith@example.com", accessToken : "123456", role : "admin"}
                const token = await joseSignUserPayload(user)
                return {token}
            }
        })
    ],
    session: {
        maxAge: 60 * 60 * 24 * 30,
        strategy: "jwt",
    },
    callbacks : {
        async jwt({token, user})
        {
            return({...token, ...user})
        },

        async session({session, token})
        {
            session.user = token
            return session
        }
    }
})

export {handler as GET, handler as POST}