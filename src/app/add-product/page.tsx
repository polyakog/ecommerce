import FormButton from "@/components/FormButton"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"



export const metadata: Metadata = {
    title: 'Добавление продукта - Mozoni',
    // colorScheme: "dark"
}

async function addProduct(formData: FormData) {
    "use server";

    const session = await getServerSession(authOptions)

     if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product")
 }
  
    const name = formData.get("productName")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);
  
    if (!name || !description || !imageUrl || !price) {
      throw Error("Missing required fields");
    }

    // for (let index = 0; index < 20; index++) {
        
      await prisma.product.create({
      data: { name, description, imageUrl, price },
    });  
        
    // }
  
    
  
    redirect("/");
  }

const AddProduct = async() => {
 const session = await getServerSession(authOptions)

//  if (!session) {
//     redirect("/api/auth/signin?callbackUrl=/add-product")
//  }
 if (session?.user?.email !== "gpolyakov77@gmail.com") {
    redirect("/")
 }

    return (
        <div>
            <h1 className="mb-3 font-bold text-lg">Добавление продукта</h1>
            <form action={addProduct}>
                <input
                    required
                    name="productName"
                    placeholder="Название продукта"
                    className="input input-bordered mb-3 w-full"
                />
                <textarea
                    required
                    name="description"
                    placeholder="Описание"
                    className="textarea textarea-bordered mb-3 w-full"
                />

                <input
                    required
                    name="imageUrl"
                    placeholder="Адрес картинки"
                    type="url"
                    className="input input-bordered mb-3 w-full"
                />
                <input
                    required
                    name="price"
                    placeholder="Цена"
                    type="number"
                    className="input input-bordered mb-3 w-full"
                />

                <FormButton className="btn-block">Добавить продукт</FormButton>
               
            </form>
        </div>
    )
}

export default AddProduct