import { getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma"
import CartEntry from "./CartEntry"
import { setProductQuanity } from "./actions"
import { formatPrice } from "@/lib/format"

export const metadata = {
    title: "Ваша корзина - Mozoni"
}
const Cart = async () => {
    const cart = await getCart()
    return (
        <div className="">
            <h1 className="text-3xl font-bold">Корзина покупок</h1>
            {cart?.items.map(cartItem => (

                <CartEntry cartItem={cartItem} key={cartItem.id} setProductQuanity={setProductQuanity} />

            ))}
            {!cart?.items.length && <p>Ваша корзина пуста</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Итого: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[300px] ">Перейти к оформлению</button>
            </div>
        </div>
    )
}

export default Cart