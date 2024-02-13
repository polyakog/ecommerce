import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import UserForm from "@/components/UserForm"
import { prisma } from "@/lib/db/prisma"


export const metadata = {
    title: "Насторойки пользователя - Mozoni"
}

type ProductPropsType = {
    params: {
        id: string
    }

}


const UserSettings = async ({ params: { id } }: ProductPropsType) => {

    const session = await getServerSession(authOptions)
    // const user = await prisma.user.findFirst({
    //     where: {
    //         id: session?.user.id
    //     }
    // })

    const user = await prisma.user.findFirst({
        where: { id }
    })




    if (!session) {
        redirect("/login")
    }

    return (

        <div>
            <h1 className="mb-4 font-bold text-lg">Профиль пользователя</h1>

            <UserForm user={user} sessionUserId={session.user.id}/>


        </div>

    )

}

export default UserSettings