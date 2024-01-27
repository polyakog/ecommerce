'use client'

import FormButton from "@/components/FormButton"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        // const email = formData.get("email"?.toString())
        // const password = formData.get("password"?.toString())

        if (!email || !password) {
            setError("Не заполнены обзятельные поля")
        }

        try {
            
            const response = await signIn('credentials', {
            email,
            password,
            redirect: false,

        })

         

        if (!response?.error) {
            
           console.log("response:", { response })
           
           router.replace("/")

        } else {
            setError("Invalid Credentials")
            return
        }

        } catch (error ) {
            console.log(error)
        }

    
       

        
        

    }

    return (

        <div className="grid place-items-center">
            <form className="flex flex-col gap-2 mx-auto " onSubmit={handleSubmit} >

            <input
                required
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="email"
                type="email"
            />

            <input
                required
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="пароль"
                type="password"
            />

            {error && <div className="m-3 badge bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 h-auto">
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