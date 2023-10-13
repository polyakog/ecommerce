import ProductCard from '@/components/ProudctCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link';

export default async function Home() {
  let products = await prisma.product.findMany({
    orderBy: { id: "desc" }
  })


  return (

    <div>
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

      <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {products.slice(1).map(p => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  )
}
