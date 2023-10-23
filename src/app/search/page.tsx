import ProductCard from "@/components/ProudctCard"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"

type SearchPropsType = {
    searchParams: { query: string }
}

export const generateMetadata = ({
    searchParams: { query}
}:SearchPropsType): Metadata =>{
return {
    title:`Поиск: ${query} - Mozoni`
}

}


const Search = async ({ searchParams: { query } }: SearchPropsType) => {
 
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } }
            ]
        },
        orderBy: { id: "desc" }
    })

    if (products.length === 0) {
        return <div className="text-center">Нет продуктов соответствующих поиску</div>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}

            Параметр запроса: {query}
        </div>
    )

}

export default Search