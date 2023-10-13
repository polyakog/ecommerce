import PriceTag from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"

type ProductPropsType = {
    params: {
        id: string
    }

}

/* кэшинг запроса  */

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) notFound()
    return product
})

/* генерируем метаданные для заголовка */
export const generateMetadata = async (
    { params: { id } }: ProductPropsType
): Promise<Metadata> => {
    const product = await getProduct(id)
    return {
        title: `${product.name} - Mozoni`,
        description: product.description,
        openGraph: {
            images: [{url: product.imageUrl}]
        }
    }
}


const Product = async (
    { params: { id } }: ProductPropsType
) => {
    const product = await getProduct(id)

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            <Image
                priority
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg"
            />
            <div>
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4" />
                <p className="py-6 ">{product.description}</p>
            </div>
        </div>

    )
}

export default Product