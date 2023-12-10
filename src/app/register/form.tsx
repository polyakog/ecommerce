'use client'

import FormButton from "@/components/FormButton"

const Form = () => {

    const handleSubmit = async (formData: FormData) => {
        // "use server"
    
        const email = formData.get("email"?.toString())
        const password = formData.get("password"?.toString())
        const repassword = formData.get("repassword"?.toString())
    
        if (!email || !password || !repassword) {
            throw Error("Не заполнены обзятельные поля")
        } else if (password !== repassword) {
            throw Error("Не совпадает повторный пароль")
        }
    
        const responce = await fetch(`/api/auth/register`, {
            method: `POST`,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    
        console.log({responce})
    
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

            <input
                required
                name="repassword"
                className="input input-bordered w-full mb-3 max-w-xs"
                placeholder="введите повторно пароль"
                type="password"
            />

            <FormButton className="w-full max-w-xs">Зарегистрировать</FormButton>

        </form>
    )

}

export default Form