"use client"

import { deleteProduct } from "@/app/admin/actions"
import { redirect } from "next/navigation"
import { ComponentProps, useState } from "react"



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

    const [disabledButton, setDisabledButton] = useState(false)


    const handleDelete = () => {
        setDisabledButton(true)
        console.log('deleting selected products')
        console.table(selectedProducts)

        selectedProducts.forEach(async (product, i, a) => {
            if (i === a.length - 1) {
                setTimeout(() => {
                    setIsApproveModal(false)
                    setSelectedProducts([])
                }, 5000);
            }

            await deleteProduct(product)
            console.log(`DELETED: ${product}`)



        })










    }


    return (
        <button
            {...props}
            className={`btn btn-primary ${className}`}
            type="button"
            disabled={disabledButton}
            onClick={handleDelete}
        >
            Удалить
        </button>
    )


}

export default DeleteButton