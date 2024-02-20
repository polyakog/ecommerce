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
        <div className="hero rounded-xl bg-base-200 ">
            <div className="hero-content text-center flex-col lg:flex-row">
                <button
                    className="mask mask-squircle"
                    tabIndex={0}
                    onClick={() => router.push(`/user-settings/${session?.user.id}`)}
                >
                    <Image
                        priority
                        src={session?.user.image || logo}
                        className=" shadow-2xl h-[70px] sm:h-[100px] lg:h-[200px]
                        w-auto
                        "
                        /* rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 */
                        width={100}
                        height={100}
                        alt="Avatar"
                    />

                </button>

                <div className="max-w-md">
                    <h1 className="text-2xl sm:text-4xl font-bold">{session?.user.name}, добро пожаловать на сайт Mozoni!</h1>
                    <p className="py-6 sm:text-lg">Вы стали нашим новым пользователем.</p>
                    <p className="py-6 sm:text-lg mt-[-30px] mb-5">Давайте начнем с краткого обзора продуктов, чтобы быстро сделать покупки!</p>

                    <button
                        tabIndex={0}
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

