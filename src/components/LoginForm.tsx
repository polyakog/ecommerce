'use client'

import FormButton from "@/components/FormButton"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import PasswordHintModal from "./PasswordHintModal"
import Image from 'next/image';
import Yandex from "../../public/images/Yandex_Browser_logo.svg"
import Mailru from "../../public/images/Mailru_logo.svg"
import useOauthError, { ErrorNameType } from "@/hooks/useOauthError"


const LoginForm = () => {
    const searchParams = useSearchParams() 
    const errorName = searchParams.get('error') as ErrorNameType    
    const oauthError = useOauthError(errorName)  
   

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [hint, setHint] = useState("")
    const [isModal, setIsModal] = useState(false)
    const router = useRouter()
    const [pending, setPending] = useState(false)

      useEffect(()=>{
        setError(oauthError!)
        setTimeout(() => {
            router.push("/login")
        }, 3000);

      }, [oauthError])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setPending(true)

        // const email = formData.get("email"?.toString())
        // const password = formData.get("password"?.toString())

        if (!email || !password) {
            setError("Не заполнены не все обзятельные поля")
        }

        try {

            const responceUserExists = await fetch(`/api/userExists`, {
                method: `POST`,
                body: JSON.stringify({ email })
            })

            const { user } = await responceUserExists.json()

            if (!user) {
                setError("Не верно введен пароль или email")
                setPending(false)
                return null
            }


            const responcePasswordExists = await fetch(`/api/passwordExists`, {
                method: `POST`,
                body: JSON.stringify({ email })
            })

            const { passwordExists } = await responcePasswordExists.json()

            if (!passwordExists) {
                setError("Пароль для данного пользователя отсутствует")
                setPending(false)
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
                setPending(false)
                return null
            }

        } catch (errorLogin) {
            console.log(errorLogin)
            setPending(false)
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


                <FormButton
                    className={"w-full max-w-xs"
                        + (pending ? "pointer-events-none btn-disabled " : "")
                    }

                >
                    Войти
                    {pending &&
                        <span className="loading loading-ring loading-md text-white" />

                    }
                </FormButton>

                <div className="text-right">
                    <span className="">{`Don't have an account?`} </span>
                    <Link className="link-primary hover:underline font-semibold" href="/register"> Зарегистрироваться</Link>
                </div>

                <div className="flex ">
                    <div className="flex items-center">
                        <span className="">Или войдите с</span>
                    </div>
                    <button
                        type="button"
                        className={"btn btn-link" + (pending ? "pointer-events-none btn-disabled " : "")}
                        onClick={() => {
                            signIn("google")
                            setPending(true)
                        }}
                    >
                        <Link className="link" href={"#"}>
                            <svg className={pending ? "opacity-50" : ""} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>                        </Link>
                    </button>
                    <button
                        type="button"
                        className={"btn btn-link" + (pending ? "pointer-events-none btn-disabled " : "")}
                        onClick={() => {
                            signIn("mailru")
                            setPending(true)
                        }}
                    >
                        <Link className="link" href={"#"}>
                            <Image
                                alt="Mail.ru"
                                src={Mailru}
                                height={38}
                                className={pending ? "opacity-50" : ""}
                            />

                        </Link>
                    </button>
                    <button
                        type="button"
                        className={"btn btn-link" + (pending ? "pointer-events-none btn-disabled " : "")}
                        onClick={() => {
                            signIn("yandex")
                            setPending(true)
                        }}
                    >
                        <Link className="link" href={"#"}>
                            <Image
                                alt="Yandex"
                                src={Yandex}
                                height={25}
                                className={pending ? "opacity-50" : ""}
                            />

                        </Link>
                    </button>

                </div>

            </form>
            {isModal &&
                <PasswordHintModal setIsModal={setIsModal} />
            }

        </div>

    )

}

export default LoginForm