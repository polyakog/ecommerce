import {cookies} from "next/dist/client/components/headers"
import { prisma } from "./prisma"
import { Cart, CartItem, Prisma } from "@prisma/client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


export type CartWithProductsType = Prisma.CartGetPayload<{
    include: {items: {include: {product: true}}}
}>

export type CartItemWithProductType = Prisma.CartItemGetPayload<{
    include: {product: true}
}>


export type ShoppingCartType = CartWithProductsType & {
    size: number
    subtotal: number
}

export const getCart = async (): Promise<ShoppingCartType | null> => {
    const session = await getServerSession(authOptions)

    let cart: CartWithProductsType | null = null 
    

    if (session) {
        // where: {userId: userId ?  userId : session.user.id},
        const userId = cookies().get("userId")?.value
        console.log ("userId from cookies FOR CART:", userId)
        console.log ("session.user.id:", session.user.id)
        

        cart = await prisma.cart.findFirst ({
            where: {userId: userId? userId : session.user.id},
            include: {items: {include: {product: true}}}
        })

    } else {
        const localCartId = cookies().get("localCartId")?.value
        cart = localCartId 
        ?   await prisma.cart.findUnique({
            where: {id: localCartId},
            include: {items: {include: {product: true}}}
            })
        : null
    }
    

    if (!cart) {
        return null
    }

    return {
        ...cart,
        size: cart.items.reduce((acc, item) =>  acc + item.quantity, 0),
        subtotal: cart.items.reduce(
            (acc, item)=> acc + item.quantity * item.product!.price, 0
            )

    }
}

export const createCart= async (): Promise<ShoppingCartType> => {
    const session = await getServerSession(authOptions)
    let newCart: Cart

    if (session) {
        newCart = await prisma.cart.create({
            data: {userId: session.user.id }
        })        
    } else {
        newCart = await prisma.cart.create({
        data: {}
    })
// Примечание: нужно encryption + secure settings в продакш апп
    cookies().set("localCartId", newCart.id) 
    cookies().set("cartMerged", "false")

    } 
   
 return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
 }
}

export const mergeAnonymousCartIntoUserCart = async (userId: string) => {
    const localCartId = cookies().get("localCartId")?.value
    const localCart = localCartId 
    ? await prisma.cart.findUnique({
        where: {id: localCartId},
        include: {items: true}
        })
    : null

      
    if (!localCart) return;

    const userCart = await prisma.cart.findFirst({
        where: {userId},
        include: {items: true}       
        })


        await prisma.$transaction(async (tx) =>{
            if (userCart) {
            const mergedCartItems = mergeCartItems(localCart.items, userCart.items)
                console.log("localCart.items:", localCart.items)
                console.log("userCart.items:", userCart.items)
                console.log("mergedCartItems:", mergedCartItems)
        await tx.cartItem.deleteMany({
            where: { cartId: userCart.id },
        })

        await tx.cartItem.createMany({
            data: mergedCartItems.map(item => ({
                cartId: userCart.id,
                productId: item.productId,
                quantity: item.quantity
            }))
        })
            } else {

                await tx.cart.create({
                    data: {
                        userId,
                        items: {
                           createMany: {
                            data: localCart.items.map(item=> ({
                                productId: item.productId,
                                quantity: item.quantity
                            }))
                           }
                        }

                    }                    
                })
            }

            await tx.cart.delete({
                where: {id: localCart.id}
            })
            // throw Error("Transaction failed");

            cookies().set("localCartId", "")
            cookies().set("cartMerged", "true")
    })
}

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
    return cartItems.reduce((acc, items) => {
      items.forEach((item) => {
        const existingItem = acc.find((i) => i.productId === item.productId);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
      });
      return acc;
    }, [] as CartItem[]);
  }