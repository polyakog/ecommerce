import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { sql } from "@vercel/postgres"


export const POST =async (request: Request) => {

    try {
        const {email, password} = await request.json()
        // валидация email и password
        

        const hashedPassword = await hash(password, 10)
        console.log('post request:', {email, hashedPassword})
        
        const responce = await sql`
INSERT INTO users (email, password)
VALUES (${email}, ${hashedPassword})
`

        
    } catch (error) {
        console.log({error})
        
    }

    return NextResponse.json({message: 'success'})

    
    
}



