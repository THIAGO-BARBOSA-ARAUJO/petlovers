import prisma from "@/config/database";
import { products } from "@prisma/client";


async function FindProductByName(search: string): Promise<products[]> {
  return prisma.products.findMany({
      where: {
      name: {
          contains: search
        }
    }
  });
}


export const searchRepository = {
  FindProductByName,
};