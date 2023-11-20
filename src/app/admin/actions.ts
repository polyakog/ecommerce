
'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from './../../lib/db/prisma';

export const deleteProduct = async (
    selectedPoductId: string, 
    
    
    )=> {
  let product = null
    product = await prisma.product.delete({
        where: {
            id: selectedPoductId
        }
    })
    
       revalidatePath("/admin")  
        
    
return product

}