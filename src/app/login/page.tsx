import { getServerSession } from "next-auth"
import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation"

const Login = async () => {
    // const session = await getServerSession()
    // if (session) {
    //     redirect("/")
    // }

    return (
        <LoginForm />
    )

}

export default Login