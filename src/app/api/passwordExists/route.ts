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
                   
            const passwordExists = user?.password? true : false             
        
        console.log("user for password exist", passwordExists)
        return NextResponse.json({passwordExists})

    } catch (error) {
        console.log("Ошибка пост запроса passwordExists", error)
        return NextResponse.json({error})
    }

}
