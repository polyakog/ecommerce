'use client'

import FormButton from "@/components/FormButton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"


const RegisterForm = () => {

    const [nameValue, setNameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [repasswordValue, setRepasswordValue] = useState("")
    const [error, setError] = useState("")

    const rouster = useRouter()

    const handleSubmit = async (formData: FormData) => {
        // "use server"

        const name = formData.get("name"?.toString())
        const email = formData.get("email"?.toString())
        const password = formData.get("password"?.toString())
        const repassword = formData.get("repassword"?.toString())




        if (!name || !email || !password || !repassword) {
            setError("Не заполнены обзятельные поля")
        } else if (password !== repassword) {
            setError("Не совпадает повторный пароль")
            return
        }

        try {
            const responceUserExists = await fetch(`/api/userExists`, {
                method: `POST`,
                body: JSON.stringify({ email })
            })

            const { user } = await responceUserExists.json()

            if (user) {
                setError("User already exists/ Пользователь уже существует")
                return
            }

            const responce = await fetch(`/api/register`, {
                method: `POST`,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })

            if (responce.ok) {

                setNameValue("")

                // formData.set("name", "df")
                // formData.set("email", "")
                // formData.set("password", "")
                // formData.set("repassword", "")
                formData.append("name", "")
                setError("")
                rouster.push('/login')
            } else {
                console.log("User registration failed")
            }
            console.log("responce form", { responce })

        } catch (error) {
            console.log("Error during registration:", error)

        }




    }

    return (
        <form className="flex flex-col gap-2 mx-auto items-center" action={handleSubmit} >

            <input
                required
                name="name"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="введите имя"
                type="text"
            />
            <input
                required
                name="email"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="введите email"
                type="email"
            />

            <input
                required
                name="password"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="введите пароль"
                type="password"
            />

            <input
                required
                name="repassword"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="введите повторно пароль"
                type="password"
            />

            <FormButton className="w-full max-w-xs">Зарегистрировать</FormButton>

            {error && <div className="m-3 badge bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 h-auto">
                {error}
            </div>
            }

            <div className="flex space-x-3">
                <span className="">Already have an account? </span>
                <Link className="link-primary hover:underline font-semibold" href="/login"> Login</Link>

            </div>


        </form>
    )

}

export default RegisterForm