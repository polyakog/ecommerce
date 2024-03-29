"use client"

import { Session } from "next-auth"
import Image from "next/image"
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

type UserMenuButtonPropsType = {
    session: Session | null
}

const UserMenuButton = ({ session }: UserMenuButtonPropsType) => {
    const user = session?.user

    const closeDropdown =() => {
        const elem = document.activeElement as HTMLElement
        if (elem) {elem.blur()}
        
            }

    return (
        <div className="dropdown dropdown-end">
            <label
                tabIndex={0}
                className=" btn btn-ghost btn-circle"
                htmlFor="">
                {user ? (
                    <div className="mask mask-circle">
                        <Image
                        priority
                        alt="Profile picture"
                        src={user.image || profilePicPlaceholder}
                        className="w-fit"
                        height={40}
                        width={40}

                    />
                    </div>
                    
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                    </svg>
                )
                }
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
            >
                <li className="">
                    <Link
                        href={`/user-settings/${user?.id}`}
                        className=""
                        onClick={closeDropdown}
                        tabIndex={0}
                    >
                        Профиль
                    </Link>
                </li>
                <li className={user?.email !== "gpolyakov77@gmail.com" ? "disabled" : ""}>
                    <Link
                        href={"/admin"}
                        className={user?.email !== "gpolyakov77@gmail.com" ? "pointer-events-none" : ""}
                        onClick={closeDropdown}
                        tabIndex={0}
                    >
                        Панель администратора
                    </Link>
                </li>
                <li>
                    {user ?
                        <button onClick={() => signOut({ callbackUrl: "/" })}>Выйти</button>
                        : <button onClick={() => signIn()}>Войти</button>
                    }
                </li>

            </ul>

        </div>
    )
}

export default UserMenuButton
