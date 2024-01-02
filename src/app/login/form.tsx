'use client'

import FormButton from "@/components/FormButton"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginForm = () => {

    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {

        const email = formData.get("email"?.toString())
        const password = formData.get("password"?.toString())

        if (!email || !password) {
            throw Error("Не заполнены обзятельные поля")
        }

        const response = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,

        })

        console.log({response})

        if (!response?.error) {
            router.push("/")
            router.refresh()

        }

    }

    return (
        <form className="flex flex-col gap-2 mx-auto items-center" action={handleSubmit} >

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


            <FormButton className="w-full max-w-xs">Войти</FormButton>

        </form>
    )

}

export default LoginForm