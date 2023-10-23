import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProudctCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link';

type HomePropsType = {
  searchParams: { page: string }
}

export default async function Home({ searchParams: { page = "1" } }: HomePropsType) {

  const currentPage = parseInt(page)

  const pageSize = 6
  const heroItemCount = 1

  const totalItemCount = await prisma.product.count()

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize)

  let products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  })


  return (

    <div className='flex flex-col items-center'>
      {currentPage === 1 &&
        <div className='hero rounded-xl bg-base-200'>
          <div className='hero-content flex-col lg:flex-row'>
            <Image
              priority
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className='w-full max-w-sm rounded-lg shadow-2xl'
            />
            <div>
              <h1 className='text-5xl font-bold'>{products[0].name}</h1>
              <p className='p-6'>{products[0].description}</p>
              <Link
                href={`/products/${products[0].id}`}
                className='btn btn-primary'
              >
                Посмотри товар
              </Link>
            </div>
          </div>
        </div>
      }

      <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {(currentPage === 1 ? products.slice(heroItemCount) : products).map(p => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      {totalPages > 1 &&
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      }

    </div>
  )
}
