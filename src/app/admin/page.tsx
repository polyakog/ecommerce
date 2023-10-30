import { prisma } from "@/lib/db/prisma"
import ProductTable from './ProductTable';


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
            
           <ProductTable products={products}/>

 

        </div>
    )
}

export default Admin
