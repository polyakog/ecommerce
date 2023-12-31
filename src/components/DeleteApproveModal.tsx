import { prisma } from "@/lib/db/prisma"

import { Product } from "@prisma/client"
import React, { useEffect } from "react"
import DeleteButton from "./DeleteButton"

type PropsType = {
    selectedProducts: string[]
    setIsApproveModal: (isApproveModal: boolean) => void
    setSelectedProducts: (selectedProduct: string[]) => void

}

const DeleteApproveModal = ({ selectedProducts, setIsApproveModal, setSelectedProducts }: PropsType) => {

    const numberSelected = selectedProducts?.length || 0
    
    useEffect(()=>{
        console.log(selectedProducts)

    },[selectedProducts])

    
    return (
        <>
            <div
                className="overscroll-contain opacity-60 inset-0 h-screen w-screen m-0 grid overflow-y-hidden backdrop-blur-sm z-[99] fixed"
            />

            <div className="z-[100] fixed h-screen w-screen flex justify-center content-center">
                <div className="modal-box h-[330px] bg-error">
                    <h3 className="font-bold text-lg text-red-50">Подтверждение удаления {numberSelected === 1 ? "продукта" : "продуктов"}!!!</h3>
                    <div className="alert py-4 mt-3 bg-red-100 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-700 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span className="text-center text-red-700 ">
                            <p>Вы уверены, что хотите удалить <b>{numberSelected}</b> {numberSelected === 1 ? "выделенный продукт" : "выделенных продукта"}?</p>
                            <br />
                            <p><i> После удаления {numberSelected === 1 ? "этой позиции" : "этих позиций"} Вы не сможете их восстановить.</i></p>

                        </span>
                    </div>

                    <div className="mt-[50px] flex justify-start gap-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => setIsApproveModal(false)}
                        >
                            Отменить
                        </button>
                       <DeleteButton 
                       className="btn btn-sm"
                       selectedProducts={selectedProducts} 
                       setIsApproveModal={setIsApproveModal}
                       setSelectedProducts={setSelectedProducts}
                       />
                    </div>
                </div>
            </div>

        </>

    )
}

export default DeleteApproveModal

