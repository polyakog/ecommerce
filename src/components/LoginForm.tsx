'use client'

import FormButton from "@/components/FormButton"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {

    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {

        const email = formData.get("email"?.toString())
        const password = formData.get("password"?.toString())

        if (!email || !password) {
            setError("Не заполнены обзятельные поля")
        }

        const response = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,

        })

        console.log({ response })

        if (!response?.error) {
            router.push("/")
            router.refresh()

        }

    }

    return (

        <div className="grid place-items-center">
            <form className="flex flex-col gap-2 mx-auto " action={handleSubmit} >

            <input
                required
                name="email"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="email"
                type="email"
            />

            <input
                required
                name="password"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="пароль"
                type="password"
            />

            {error && <div className="m-3 badge badge-error badge-lg">
                {error}
            </div>
            }

            <div className="text-right">
                <span className="">{`Don't have an account?`} </span>
                <Link className="link-primary hover:underline font-semibold" href="/register"> Register</Link>

            </div>

            <FormButton className="w-full max-w-xs">Login</FormButton>

        </form>
        </div>
        
    )

}

export default LoginForm