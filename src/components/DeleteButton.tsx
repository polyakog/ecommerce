"use client"


import { deleteProduct } from "@/app/admin/actions"
import { prisma } from "@/lib/db/prisma"
import { ComponentProps } from "react"



type DeleteButtonType = {
    children?: React.ReactNode
    className?: string
    selectedProducts: string[]
    setSelectedProducts: (selectedProduct: string[]) => void
    setIsApproveModal: (IsAppoveModal: boolean) => void
} & ComponentProps<"button">

const DeleteButton = async ({
    children,
    className,
    selectedProducts,
    setSelectedProducts,
    setIsApproveModal,
    ...props
}: DeleteButtonType) => {



    const handleDelete = () => {
        setIsApproveModal(false)
        console.log('deleting selected products')
        console.table(selectedProducts)

        deleteProduct('65311e7eafcd16845cfb1452')
        console.log('deleting done 65311e7eafcd16845cfb1452')

        // await prisma.product.delete({
        //     where: {
        //         id: '65311e7eafcd16845cfb1454'
        //     }
        // })



        // const deleteCartItem = prisma.cartItem.deleteMany({
        //     where: {
        //         productId: selectedProducts[0]
        //     }
        // })

        // const deleteProduct = prisma.product.delete({
        //     where: {
        //         id: selectedProducts[0]
        //     }
        // })

        // console.log(deleteCartItem)
        // console.log(deleteProduct) 

        // await prisma.$transaction([deleteCartItem, deleteProduct])



        // await prisma.product.deleteMany({
        //     where: { 
        //         id: {
        //         in: selectedProduct    
        //         }
        //     }
        // })

        setSelectedProducts([])


    }


    return (
        <button
            {...props}
            className={`btn btn-primary ${className}`}
            type="button"
            disabled={false}
            onClick={handleDelete}
        >
            Удалить
        </button>
    )


}

export default DeleteButton