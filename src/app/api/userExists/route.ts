import { prisma } from "@/lib/db/prisma"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {

    try {
        
        const {email} = await request.json()
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        console.log("user", user)
        return NextResponse.json({user})

    } catch (error) {
        console.log("Ошибка пост запроса userExists", error)
    }

}
