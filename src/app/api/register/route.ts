import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { sql } from "@vercel/postgres"
import { prisma } from "@/lib/db/prisma"


export const POST =async (request: Request) => {

    try {
        const {name, email, password} = await request.json()
        // валидация email и password
        

        const hashedPassword = await hash(password, 10)
        console.log('post request:', {name, email, hashedPassword})
        
//         const responce = await sql`
// INSERT INTO users (email, password)
// VALUES (${email}, ${hashedPassword})
// `

await prisma.user.create({
    data: {name, email, password: hashedPassword}
})

return NextResponse.json({message: 'User registered'}, {status: 201})
        
    } catch (error) {
        console.log({error})
        return NextResponse.json(
            {message: 'An error occured while registering the user'}, 
            {status: 500}
        )
        
    }

    

    
    
}



