import React from "react"
import { Product } from '@prisma/client';
import Image from 'next/image'
import PriceTag from "@/components/PriceTag";
import Link from 'next/link';



type ProductPropsType = {
    product: Product
}

const ProductList = ({ product }: ProductPropsType) => {

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
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