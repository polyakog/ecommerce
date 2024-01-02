import FormButton from "@/components/FormButton"
import Form from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

 

const Register = async () => {
    // const session = await getServerSession()
    // if (session) {
    //     redirect("/")
    // }

    return (
        <Form/>
    )
}

export default Register