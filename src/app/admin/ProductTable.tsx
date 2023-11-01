"use client"
import React, { useEffect, useState } from "react"
import { Product } from "@prisma/client"
import ProductList from "./Product"
import Link from 'next/link';
import DeleteModal from "@/components/DeleteModal";

type ProudctTablePropsType = {
    products: Product[]
}

export type SlectedProductType = {
    productId: string
}


const ProductTable = ({ products }: ProudctTablePropsType) => {

    const [selectedProduct, setSelectedProduct] = useState<SlectedProductType[]>()
    const [selectedAll, setSelectedAll] = useState(false)
    const [isModal, setIsModal] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.checked) {

            let setAddProduct = products.map(p => ({ productId: p.id }))
            setSelectedAll(true)
            setSelectedProduct(setAddProduct)
            // console.log('setAddProduct=', setAddProduct)
        } else {
            let setAddProduct: SlectedProductType[] = []
            setSelectedAll(false)
            setSelectedProduct(setAddProduct);
            // console.log('setAddProduct=', setAddProduct)
        }

    }



    const classTableTop = `${selectedProduct?.length ? " bg-slate-400 rounded-t-lg" : ""} pb-2 border-b-2 border-gray-800 `


    return (
        <>
           {isModal && <DeleteModal setIsModal={setIsModal} />} 

            <div className=" card rounded-lg w-auto bg-base-100 shadow-xl mt-2">

                {/* панель удаления и добавления */}
                <div className={classTableTop}>
                    {
                        !selectedProduct || selectedProduct?.length === 0 ?
                            <div className="flex justify-end mt-2 mr-2">
                                <Link
                                    href={"/add-product"}
                                    className='btn btn-circle btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-md'
                                >
                                    +
                                </Link>
                            </div>
                            :
                            <>
                                <div className="flex gap-3 items-center mt-2">
                                    <span className="ml-5 text-white"> {selectedProduct?.length} выделен</span>
                                    <button
                                        className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-md "
                                        onClick={() => {
                                            setIsModal(true)
                                            console.log(isModal)
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>


                            </>

                    }

                </div>


                <div className="overflow-x-auto">
                    <table className="table">
                        {/* заголовок таблицы */}
                        <thead className="text-center">
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" onChange={handleChange} />
                                    </label>
                                </th>
                                <th>Фото</th>
                                <th>Название продукта</th>
                                <th>цена</th>
                                <th>Создано</th>
                                <th>Обнавлено</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* тело табилцы */}
                            {products.map(p => (
                                <ProductList product={p} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} selectedAll={selectedAll} key={p.id} />
                            ))}


                        </tbody>

                    </table>

                </div>
            </div>
        </>





    )

}

export default ProductTable



