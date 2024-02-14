import { prisma } from "@/lib/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth/next"
import {NextAuthOptions, User} from "next-auth"
import {Adapter} from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import MailRuProvider from "next-auth/providers/mailru"
import CredentialsProvider from "next-auth/providers/credentials"
import { env } from "@/lib/env"
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart"
import { compare } from "bcrypt"
import Yandex from "next-auth/providers/yandex"




export const authOptions: NextAuthOptions = {


   adapter: PrismaAdapter(prisma) as Adapter,
   providers: [
    GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    MailRuProvider({
      clientId: env.MAILRU_CLIENT_ID,
      clientSecret: env.MAILRU_CLIENT_SECRET
    }),

    Yandex({
        clientId: env.YANDEX_CLIENT_ID,
        clientSecret: env.YANDEX_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {

        const email = credentials?.email as string
        const password = credentials?.password as string
                
        try {
           const user = await prisma.user.findFirst({
            where: {
                email
            }            
        })

            if (!user) return null
            
              const passwordMatch = await compare(password, user.password!)
    
             if (!passwordMatch) {
               return null
              } 

             console.log("user in route:", user)
             return user               

        } catch (error) {

          console.log("error in credentials:", error)
        }   
                  
        return null                     
        }        
    })

   ],

   session: {
    strategy: "jwt",    
},

  secret: process.env.NEXTAUTH_SECRET,

  callbacks:{
    async session({ session, token}) {
      if (token.sub) {
        
    session.user.id = token.sub
     }
      return session
    },
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {

    //     await prisma.user.update({
    //                     where: {email: profile?.email},          
    //                     data: {emailVerified: new Date()}   
    //     })
       
    //   }
    //   return true
    // },

  },

 

   events: {
    async signIn({ user }) {
       await mergeAnonymousCartIntoUserCart(user.id);
    },

    async signOut() {
      // cookies().set("userId", "") 
    }
    
  },

  pages: {
    signIn: '/login',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)

  }
  
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}