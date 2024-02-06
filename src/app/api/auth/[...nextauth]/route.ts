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
import { cookies } from "next/dist/client/components/headers"




export const authOptions: NextAuthOptions = {


   adapter: PrismaAdapter(prisma) as Adapter,
   providers: [
    GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    // MailRuProvider({
    //   clientId: process.env.MAILRU_CLIENT_ID,
    //   clientSecret: process.env.MAILRU_CLIENT_SECRET
    // }),
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
             //  console.log("passwords to match", password, user.password)
             //  console.log("passwordMatch:", passwordMatch)
   
             if (!passwordMatch) {
               // console.log("WRONG PASSWORD!!!")
               return null
              } 
             //  else {
             //   console.log("userId", user.id)
             //   cookies().set("userId", user.id)        
             //  }
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
    }
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
    signIn: '/login'
  }
  
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}