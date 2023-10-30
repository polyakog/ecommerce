import { prisma } from "@/lib/db/prisma"
import ProductTable from './ProductTable';
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"


export const metadata = {
    title: "Кабинет администратора - Mozoni"
}


const Admin = async () => {

    const session = await getServerSession(authOptions)

     if (session?.user?.email !== "gpolyakov77@gmail.com") {
        redirect("/")
     }

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
