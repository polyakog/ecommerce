import React, { useEffect, useRef } from "react"
import { Product } from '@prisma/client';
import Image from 'next/image'
import PriceTag from "@/components/PriceTag";
import Link from 'next/link';
import { SlectedProductType } from "./ProductTable";




type ProductPropsType = {
    product: Product
    selectedProduct: SlectedProductType[] | undefined
    setSelectedProduct: (selectedProduct: SlectedProductType[]) => void
    selectedAll: boolean
}

const ProductList = ({ product, selectedProduct, setSelectedProduct, selectedAll }: ProductPropsType) => {

    const ref = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const addProduct = (selectedProduct ? selectedProduct : [])
        if (e.currentTarget.checked) {

            let setAddProduct = [...addProduct, { productId: e.currentTarget.value }]
            setSelectedProduct(setAddProduct)
            console.log('setAddProduct=', setAddProduct)
        } else {
            let setAddProduct = addProduct.filter(p => {
                return p.productId !== e.currentTarget.value
            })
            setSelectedProduct(setAddProduct);
            console.log('setAddProduct=', setAddProduct)
        }

    }

    useEffect(() => {

        if (ref.current !== null) {
            if (selectedAll) {
                ref.current.checked = true
            } else ref.current.checked = false
        }


    }, [selectedAll])




    return (
        <tr>
            <th>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox"
                        value={product.id}
                        onChange={handleChange}
                        ref={ref}
                        name="productCheck"
                    />
                </label>
            </th>
            <td>
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <Image
                                priority
                                src={product.imageUrl}
                                alt={`photo-${product.name}`}
                                width={48}
                                height={48}
                                className='w-full max-w-sm rounded-lg shadow-2xl'
                            />
                        </div>
                    </div>


                </div>
            </td>
            <td>
                <div className="flex items-center justify-center">
                    <span className="font-bold">{product.name}</span>
                </div>
            </td>
            <td>
                <div className="flex items-center justify-start">
                    <PriceTag price={product.price} className="" />
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center">
                    <span >{product.createdAt.toLocaleDateString()}</span>
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center">
                    <span >{product.updatedAt.toLocaleDateString()}</span>
                </div>
            </td>

            <th>
                <Link className="btn btn-ghost btn-xs"
                    href={`/products/${product.id}`}
                >
                    подробнее
                </Link>
            </th>




        </tr>

    )
}

export default ProductList