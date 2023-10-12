import { Product } from "@prisma/client"
import { now } from "next-auth/client/_utils"
import Link from "next/link"
import PriceTag from "./PriceTag"
import Image from "next/image"

type ProductCardPropsType = {
    product: Product
}

const ProductCard = ({ product }: ProductCardPropsType) => {

    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

    return (
        <div>
            <Link
                href={`/products/${product?.id}`}
                className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
            >
                <figure>
                    <Image
                        // priority
                        src={product.imageUrl}
                        alt={product.name}
                        width={800}
                        height={400}
                        className="h-48 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {product.name}
                    </h2>
                    {isNew && <div className="badge badge-secondary">Новинка</div>}
                    <p>{product.description}</p>
                    <PriceTag price={product.price} className="" />


                </div>
            </Link>

        </div>
    )
}

export default ProductCard