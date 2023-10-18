import { prisma } from "@/lib/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth/next"
import {NextAuthOptions} from "next-auth"
import {Adapter} from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import { env } from "@/lib/env"


export const authOptions: NextAuthOptions = {

   adapter: PrismaAdapter(prisma) as Adapter,
   providers: [
    GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
    })
   ],
   callbacks: {
    session({session, user}) {
        session.user.id = user.id
        return session
    },
   }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}