import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/datarobot_logo_icon_169296.png"
import { redirect } from "next/navigation"
import { getCart } from "@/lib/db/cart"
import ShoppingCartButton from "./ShoppingCartButton"
import UserMenuButton from "./UserMenuButton"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

const searchProduct = async (formData: FormData) => {
    "use server"

    const searchQuery = formData.get("searchQuery")?.toString()

    if (searchQuery) {
        const newSearchQuaery = encodeURIComponent(searchQuery) // кодируем в русский текст
        redirect(`/search?query=${newSearchQuaery}`)
        // console.log(searchQuery)
    }
}

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    const cart = await getCart()

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1 ">
                    <Link href={'/'} className="btn btn-ghost text-xl normal-case">
                        <Image
                            alt="Mozoni logo"
                            src={logo}
                            height={40}
                            width={40}
                        />
                        Mozoni
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProduct}>
                        <div className="flex relative">
                            <input
                                name="searchQuery"
                                placeholder="Искать"
                                className="input input-bordered w-full min-w-[100px]"
                            />
                            <button className="btn btn-ghost btn-circle absolute right-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>

                    </form>
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />

                </div>
            </div>
        </div>
    )
}

export default Navbar