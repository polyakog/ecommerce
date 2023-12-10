import { NextResponse } from "next/server"
import {hash} from 'bcrypt'


export const POST =async (request: Request) => {

    try {
        const {email, password} = await request.json()
        // валидация email и password
        console.log({email, password})

        const hashedPassword = await hash(password, 10)
        
    } catch (error) {
        console.log({error})
        
    }

    return NextResponse.json({message: 'success'})

    
    
}



