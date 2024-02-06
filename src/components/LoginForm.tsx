'use client'

import FormButton from "@/components/FormButton"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import PasswordHintModal from "./PasswordHintModal"

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [hint, setHint] = useState("")
    const [isModal, setIsModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        // const email = formData.get("email"?.toString())
        // const password = formData.get("password"?.toString())

        if (!email || !password) {
            setError("Не заполнены не все обзятельные поля")
        }

        try {

            const responcePasswordExists = await fetch(`/api/passwordExists`, {
                method: `POST`,
                body: JSON.stringify({ email })
            })

            const { passwordExists } = await responcePasswordExists.json()

            if (!passwordExists) {
                setError("Пароль для данного пользователя отсутствует")
                setHint("Подсказка")
                return null
            }


            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })


            if (!response?.error) {
                // console.log("response:", { response })
                router.refresh()

            } else {
                setError(`Не верно введен пароль или email`)
                return
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleHint = () => {
        setIsModal(!isModal)
    }

    return (

        <div className="grid place-items-center">
            <form className="flex flex-col gap-2 mx-auto " onSubmit={handleSubmit} >

                <input
                    required
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
                    }}
                    name="email"
                    className="input input-bordered w-full mb-3 max-w-xs"
                    placeholder="email"
                    type="email"
                />

                <input
                    required
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError("")
                    }}
                    name="password"
                    className="input input-bordered w-full mb-3 max-w-xs"
                    placeholder="пароль"
                    type="password"
                />

                {error &&
                    <div className="m-3 badge bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 h-auto flex-col">
                        {error}
                        {hint &&
                            <div onClick={handleHint} className="badge cursor-pointer">{hint}</div>
                        }
                    </div>
                }

                {/* {hintModal && 
                <div className=" badge">

                </div>
                } */}



                <div className="text-right">
                    <span className="">{`Don't have an account?`} </span>
                    <Link className="link-primary hover:underline font-semibold" href="/register"> Register</Link>

                </div>

                <FormButton className="w-full max-w-xs">Login</FormButton>

            </form>
            {isModal &&
                <PasswordHintModal setIsModal={setIsModal} />
            }

        </div>

    )

}

export default LoginForm