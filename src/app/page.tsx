import ProductCard from '@/components/ProudctCard'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link';

export default async function Home() {
  let products = await prisma.product.findMany({
    orderBy: { id: "desc" }
  })

  if (!products.length) {

    products = [
      {
        id: "25",
        name: "кросовки",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        description: "Это кровсовки с современнным дизайном. Цвет: красный",
        price: 2999999,
        createdAt: new Date("2023-10-12T11:48:01.812Z"),
        updatedAt: new Date(Date.now())

      },
      {
      id: "24",
        name: "Очки солнцезащитные",
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        description: "Очки солнцезащитные черные. Душки мягкие. Лизнцы из поликарбоната. Подходят для вождения автомобиля.",
        price: 239999,
        createdAt: new Date("2023-10-12T13:28:01.812Z"),
        updatedAt: new Date(Date.now())

      },
      {
        id: "23",
        name: "Косметика",
        imageUrl: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
        description: "Набор натуральной косметики.",
        price: 120000,
        createdAt: new Date("2023-10-12T13:48:01.812Z"),
        updatedAt: new Date(Date.now())

      },
      {
        id: "22",
        name: "Часы",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80",
        description: "Электронные часы. Опции: выбор цвета ремешка при заказе",
        price: 120000,
        createdAt: new Date("2023-10-12T13:48:01.812Z"),
        updatedAt: new Date(Date.now())

      },
      {
        id: "21",
        name: "ОбЪектив",
        imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        description: "Объектив для зеркального фотоаппарата",
        price: 1854500,
        createdAt: new Date("2023-10-12T13:58:01.812Z"),
        updatedAt: new Date(Date.now())

      },
      {
        id: "20",
        name: "Набор носков",
        imageUrl: "https://images.unsplash.com/photo-1634283715079-d91bbed0ece0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        description: 
        "Набор носков состоит из 3-х пар разных цветов: зеленый, охра, красный. Набор укакован в подарочную упаковку",
        price: 79099,
        createdAt: new Date("2023-10-12T14:25:01.812Z"),
        updatedAt: new Date(Date.now())

      }
    ]

  }


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
