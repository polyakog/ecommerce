
'use server'

import { prisma } from './../../lib/db/prisma';

export const deleteProduct = async (selectedPoductId: string)=> {
  let product = null
    product = await prisma.product.delete({
        where: {
            id: selectedPoductId
        }
    })
    
return product
}