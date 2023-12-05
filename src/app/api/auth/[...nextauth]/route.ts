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

type UserType = {
  id: string
  email: string
  password: string
  name: string
  role: string
}
const users: UserType[]  =[
  {id: '1', email: 'gpolyakov77@yandex.ru', password: '123', name: 'Gennadij', role: 'admin'}
]

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
      credentials: {
        email: {label: 'email', type: 'email', required: true},
        password: {label: 'password', type: 'password', required: true},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)return null

        const currentUser = users.find(user => user.email === credentials.email)
        
        if (currentUser && currentUser.password === credentials.password){
          const {password, ...user} = currentUser

          return user as User
        }
        
        return null
      }
    })

   ],
   callbacks: {
    session({session, user}) {
        session.user.id = user.id
        return session
    },
   },
   events: {
    async signIn({ user }) {
       await mergeAnonymousCartIntoUserCart(user.id);
    },
  },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}