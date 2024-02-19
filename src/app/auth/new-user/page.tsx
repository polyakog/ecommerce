import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NewUser } from "./NewUser"





const NewUserPage = async () => {
    "use server"
    const session = await getServerSession(authOptions) 

 

    return (

        <div>
            <NewUser session = {session}/>

        </div>

    )

}

export default NewUserPage