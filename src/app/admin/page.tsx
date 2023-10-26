import { prisma } from "@/lib/db/prisma"
import ProductList from "./Product"
import Link from 'next/link';


export const metadata = {
    title: "Кабинет администратора - Mozoni"
}


const Admin = async () => {

    let products = await prisma.product.findMany({
        orderBy: { id: "desc" }
    })

    return (
        <div>
            <h1 className="mb-4 font-bold text-lg">Страница администратора</h1>

            <h2 className="font-bold text-base text-center">Продукты</h2>
            {/* добавить прородукт */}
           
            <Link
                href={"/add-product"}
                className='btn btn-circle btn-neutral'
              >
                +
              </Link>

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

export default Admin
