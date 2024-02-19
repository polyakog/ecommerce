"use client"

import Image from "next/image"
import logo from "@/assets/logo_icon.svg"
import { Session } from "next-auth";
import { useRouter } from "next/navigation";



type NewUserType = {
    session: Session | null

}

export const NewUser = ({ session }: NewUserType) => {
    const router = useRouter()


    return (
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content text-center flex-col lg:flex-row">
                <Image
                    priority
                    src={session?.user.image || logo}
                    className="rounded-lg shadow-2xl p-1 
            h-[70px] w-[auto] 
            sm:h-[100px] sm:w-[auto] 
            lg:h-[300px] lg:w-[auto]"
                    width={100}
                    height={100}
                    alt="Avatar"
                />
                <div className="max-w-md">
                    <h1 className="text-2xl sm:text-4xl font-bold">{session?.user.name}, добро пожаловать на сайт Mozoni!</h1>
                    <p className="py-6 sm:text-lg">Вы стали нашим новым пользователем.</p>
                    <p className="py-6 sm:text-lg mt-[-30px] mb-5">Давайте начнем с краткого обзора продуктов, что быстро сделать покупки!</p>

                    <button
                        className="btn btn-primary"
                        onClick={() => router.push("/")}
                    >
                        Начнем
                    </button>


                </div>

            </div>

            {/* Let's start with a quick product tour and we will have you up and running in no time! */}


        </div>
    )
}

