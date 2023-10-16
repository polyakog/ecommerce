import {cookies} from "next/dist/client/components/headers"
import { prisma } from "./prisma"
import { Prisma } from "@prisma/client"


export type CartWithProductsType = Prisma.CartGetPayload<{
    include: {items: {include: {product: true}}}
}>

export type ShoppingCartType = CartWithProductsType & {
    size: number
    subtotal: number
}

export const getCart = async (): Promise<ShoppingCartType | null> => {
    const localCardId = cookies().get("localCardId")?.value
    const cart = localCardId ?
    await prisma.cart.findUnique({
        where: {id: localCardId},
        include: {items: {include: {product: true}}}
    })
    : null

    if (!cart) {
        return null
    }

    return {
        ...cart,
        size: cart.items.reduce((acc, item)=>  acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item)=> acc + item.quantity * item.product.price, 0
            )

    }
}

export const createCart= async (): Promise<ShoppingCartType> => {
    const newCart = await prisma.cart.create({
        data: {}
    })

    // Примечание: нужно encryption + secure settings в продакш апп
    cookies().set("localCardId", newCart.id) 
 return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
 }

}