"use client"
import React, { useState } from "react"
import { Product } from "@prisma/client"
import ProductList from "./Product"
import Link from 'next/link';

type ProudctTablePropsType = {
    products: Product[]
}

type SlectedProductType = {
    productId: string
}


const ProductTable = ({ products }: ProudctTablePropsType) => {

    const [selectedProduct, setSelectedProduct] = useState<SlectedProductType[]>()
    return (
        <div className=" card rounded-lg w-auto bg-base-100 shadow-xl">

        {/* панель удаления и добавления */}
        <div className="flex gap-3 items-center mt-3">
           <Link
                href={"/add-product"}
                className='btn btn-circle btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-md'
              >
                +
              </Link>
              {/* <span> {selectedProduct?.length} выделено</span> */}
              <button className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-md ">Удалить</button>

           </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* заголовок таблицы */}
                    <thead className="text-center">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
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
                            <ProductList product={p} key={p.id} />
                        ))}


                    </tbody>

                </table>

            </div>
        </div>




    )

}

export default ProductTable
