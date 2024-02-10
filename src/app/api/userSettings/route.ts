import { NextResponse } from "next/server"
import { prisma } from '../../../lib/db/prisma';
import { hash } from "bcrypt";



export const POST = async (request: Request) =>{

    try {

        const {id, name, image, password, hashedPassword} = await request.json()
     
        let hashedUserPassword = ""

        if (password) {
            hashedUserPassword = await hash(password, 10)

        } else hashedUserPassword = hashedPassword

        await prisma.user.update({
                        where: {id},
                        data: {name, password: hashedUserPassword, image}
})

return NextResponse.json({message: 'User settings updated'}, {status: 201})


        
    } catch (error) {
        
        return NextResponse.json(
            {message: `An error(${error}) occured while updating the user settings`}, 
            {status: 500}
        )
        
    }
}