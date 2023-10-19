"use client"

import { CartItemWithProductType } from "@/lib/db/cart"
import { formatPrice } from "@/lib/format"
import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"

type CartEntryPropsType = {
    cartItem: CartItemWithProductType,
    setProductQuanity: (productId: string, quantity: number) => Promise<void>
}

const CartEntry = ({
    cartItem: { product, quantity },
    setProductQuanity
}: CartEntryPropsType) => {
    const [isPending, startTransition] = useTransition()

    const quantityOptions: JSX.Element[] = []
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option value={i} key={i}>{i}</option>
        )

    }

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image
                    alt={product.name}
                    src={product.imageUrl}
                    height={200}
                    width={200}
                    className="rounded-lg"
                />
                <div>
                    <Link
                        href={`/products/${product.id}`}
                        className="font-bold"
                    >
                        {product.name}
                    </Link>
                    <div>Цена: {formatPrice(product.price)}</div>
                    <div className="my-1 flex items-center gap-2">
                        Количество:
                        <select
                            className="select select-bordered w-full max-w-[80px]"
                            defaultValue={quantity}
                            onChange={e => {
                                const newQuantity = parseInt(e.currentTarget.value)
                                startTransition(async () => {
                                    await setProductQuanity(product.id, newQuantity)
                                })
                            }}
                        >
                            <option value={0}>0 (Remove)</option>
                            {quantityOptions}
                        </select>
                    </div>
                    <div className="flex items-center gap-3">
                        Всего: {formatPrice(product.price * quantity)}
                        {isPending && <span className="loading loading-spinner loading-sm" />}
                    </div>

                </div>

            </div>
            <div className="divider" />
        </div>
    )
}

export default CartEntry