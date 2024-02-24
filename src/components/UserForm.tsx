'use client'

import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import FormButton from "./FormButton"
import Image from "next/image"
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { User } from "@prisma/client"
import settings from "../../public/images/settings.svg"
import editAvatar from "../../public/images/modify_image.svg"
import { now } from "next-auth/client/_utils"
import { EditAvatarModal } from "./EditAvatarModal"


type UserFormProps = {
    sessionUserId: string
    user: User | null
}

const UserForm = ({ sessionUserId, user }: UserFormProps) => {

    const [name, setName] = useState(user?.name)
    const [image, setImage] = useState(user?.image)
    const id = user?.id
    const email = user?.email
    const hashedPassword = user?.password
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)
    // const [hint, setHint] = useState("")
    const [isEditAvatarModal, setIsEditAvatarModal] = useState(false)
    const router = useRouter()

    const [editable, setEditable] = useState(false)
    const [isProfileOner, setIsProfileOner] = useState(false)


    useEffect(() => {

        if (sessionUserId === id) {
            setIsProfileOner(true)
        }

    }, [])




    const handleEditProfile = () => {
        setEditable(!editable)
    }
    const handleEditAvatar = () => {
        setIsEditAvatarModal(!isEditAvatarModal)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
        if (password !== repassword) {
            setError("Не верно введен повторно пароль")
            return null
        }

        console.log(id, name, image, "password:", password)

        const responce = await fetch(`/api/userSettings`, {
            method: `POST`,
            body: JSON.stringify({ id, name, image, password, hashedPassword })
        })

        if (responce.ok) {
            setError("")
            // router.refresh()
            console.log('status:', responce.status)
            console.log("ОБНОВИЛСЯ ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ")
            setPending(false)

        }
        // else setError(`ошибка обновления профиля: ${responce.status}`)
    }


    const handlePassword = async (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setError("")
    }
    const handleRepassword = async (e: ChangeEvent<HTMLInputElement>) => {
        setRepassword(e.target.value)
        setError("")
    }

    return (
        <div className="lg:flex w-full sm:grid">
            <div className="lg:w-[330px] mt-4 mb-4 grid h-25  card place-items-center ">
                <div className="indicator">
                    <div className="avatar ">
                        <div className="h-[50px] sm:h-[100px] lg:h-[200px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 z-10">
                            <Image
                                priority
                                alt="User avatar"
                                src={image || profilePicPlaceholder}
                                height={200}
                                width={200}
                            />
                        </div>
                    </div>

                    {isProfileOner &&
                        <div
                            className="indicator-item indicator-top indicator-start ml-[-12px]"
                        >
                            <button
                                className="btn btn-circle"
                                onClick={handleEditAvatar}
                            >
                                <Image
                                    priority
                                    alt="Edit avatar"
                                    src={editAvatar}
                                    className="h-[25px] sm:h-[30px] lg:h-[35px]"
                                />
                            </button>
                        </div>
                    }



                </div>


            </div>


            <div className=" grid h-auto  flex-grow card bg-base-300 rounded-box place-items-center">
                <div className="indicator p-5">

                    {isProfileOner &&
                        <div className="indicator-item">
                            <button
                                className="btn btn-circle"
                                onClick={handleEditProfile}

                            >
                                <Image
                                    priority
                                    src={settings}
                                    className="h-[25px] sm:h-[30px] lg:h-[35px]"
                                    alt="Edit profile"
                                />

                            </button>

                        </div>

                    }

                    <form className="flex flex-col gap-2 mx-auto " onSubmit={handleSubmit} >

                        <input
                            required
                            value={name as string}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError("")
                            }}
                            name="name"
                            className={
                                "input input-bordered w-full mb-3 max-w-xs " +
                                (!editable ? "input-disabled pointer-events-none " : "")}
                            placeholder="name"
                            type="text"
                        />

                        <input
                            value={email as string}
                            readOnly
                            name="email"
                            className="input input-disabled pointer-events-none input-bordered w-full mb-3 max-w-xs"
                            // placeholder="email"
                            type="text"
                        />
                        {editable &&

                            <>
                                <input
                                    autoComplete="new-password"
                                    onChange={handlePassword}
                                    name="password"
                                    className="input input-bordered w-full mb-3 max-w-xs"
                                    placeholder="password"
                                    type="password"
                                />

                                <input
                                    onChange={handleRepassword}
                                    name="repassword"
                                    className="input input-bordered w-full mb-3 max-w-xs"
                                    placeholder="повторите пароль"
                                    type="password"
                                />

                                {error &&
                                    <div className="m-3 badge bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 h-auto flex-col">
                                        {error}
                                    </div>
                                }
                                <div className="join join-horizontal gap-1">
                                    <FormButton className="w-[50%] join-item">
                                        Сохранить
                                        {pending &&
                                            <span className="loading loading-ring loading-md" />
                                        }
                                    </FormButton>
                                    <button onClick={() => router.back()} type="reset" className="btn btn-primary join-item w-[50%]">Отменить</button>
                                </div>
                            </>
                        }

                    </form>
                </div>


            </div>

            {isEditAvatarModal &&
            // image, setImage, setIsEditAvatarModal, setError

                <EditAvatarModal image={image} setImage={setImage} setIsEditAvatarModal={setIsEditAvatarModal} setError={setError} />
            }



        </div>
    )


}

export default UserForm