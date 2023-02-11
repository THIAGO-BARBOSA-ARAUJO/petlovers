import prisma from "@/config/database";
import { products } from "@prisma/client";

async function GetProductsByCategory(animal: string): Promise<products[]> {
  return prisma.products.findMany({
    where: {
      animal,
    },
  });
}

export const animalsrepository = {
  GetProductsByCategory,
};
