import FormButton from "@/components/FormButton"
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

 

const Register = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect("/")
    }

    return (
        <RegisterForm/>
    )
}

export default Register